"""
Handles chores.
"""

from bson import ObjectId
from typing import Dict
from uuid import uuid4
from api.v1.views import mongo, redis_client
from api.v1.utils.usersUtil import Users
from api.v1.utils.providersUtils import Providers
from api.v1.utils.servicesUtils import Services

def convert_chore_obj(chore):
    """
    Converts the chore object to a friendlier format.
    """
    provider_name = Providers.get_provider_from_id(chore.get('provider_id')).get('name')
    client = Users.get_user_from_id(chore.get('client_id'))
    client_name = f"{client.get('first_name')} {client.get('last_name')}"
    converted_chore = {'id': chore['id'],
                       'client_name': client_name,
                       'provider_name': provider_name,
                       'date': chore['date']
                       }
    return converted_chore


class Chores:
    """
    Handles chores data.
    """
    
    @staticmethod
    def add_chore(service_id: str, provider_id: str, date: str, session_id: str) -> Dict:
        """
        Adds chore object to database.
        """
        
        user = Users.get_user_from_session_id(session_id)
        if user:
            service = Services.get_service_by_id(service_id)
            provider = Providers.get_provider_from_id(provider_id)
            if not service or not provider:
                return None
            if service['name'] not in provider['services']:
                return {'error': 'provider service mismatch'}
            chores_collection = mongo.db.chores
            chore_token = str(uuid4())
            inserted_chore = chores_collection.insert_one({'name': service['name'], 'provider_id': provider_id, 'client_id': user['id'], 'date': date, 'chore_token': chore_token})
            chore = chores_collection.find_one({'_id': inserted_chore.inserted_id})
            chore_id = str(inserted_chore.inserted_id)
            key = f'chore_{chore_token}'
            expire_time = 300
            redis_client.setex(key, expire_time, chore_id)
            
            users_collection = mongo.db.users
            providers_collection = mongo.db.providers
            user_id = user['id']
            chore['id'] = str(chore['_id'])
            del chore['_id']

            providers_collection.find_one_and_update({'_id': ObjectId(provider_id)},
                                                     {"$push": {'active_chores': convert_chore_obj(chore)}})
            
            users_collection.find_one_and_update({'_id': ObjectId(user_id)},
                                                 {"$push": {'active_chores': convert_chore_obj(chore)}})
            
            return {'chore_token': chore_token, 'expiration_time': expire_time, 'chore_id': chore_id}
        return None


    @staticmethod
    def get_chore_id_by_token(chore_token: str) -> str:
        """
        Gets a chore_id by token.
        """
        key = f"chore_{chore_token}"
        if redis_client.exists(key):
            user_id = redis_client.get(key)
            return user_id.decode('utf-8')
        return None


    @staticmethod
    def get_chore(session_id: str, chore_token: str) -> Dict:
        """
        Retrieves a chore.
        """
        user = Users.get_user_from_session_id(session_id)
        if not user:
            return {'error': 'user not found'}
        chore_id = Chores.get_chore_id_by_token(chore_token)
        if chore_id:
            chores_collection = mongo.db.chores
            document = chores_collection.find_one({'_id': ObjectId(chore_id), 'client_id': user['id']})
            if document:
                document['id'] = str(document['_id'])
                del document['_id']
            return document
        return None


    @staticmethod
    def delete_expired_chore(chore):
        """
        Deletes an expired_chore.
        """
        chore_id = chore['id']
        chores_collection = mongo.db.chores
        users_collection = mongo.db.users
        providers_collection = mongo.db.providers
        saved_chore = chores_collection.find_one({'_id': ObjectId(chore_id)})
        provider_id = saved_chore['provider_id']
        client_id = saved_chore['client_id']
        chores_collection.find_one_and_delete(saved_chore)
        users_collection.find_one_and_update({'_id': ObjectId(client_id)},
                                             {'$pull': {'active_chores': chore}})
        providers_collection.find_one_and_update({'_id': ObjectId(provider_id)},
                                                 {'$pull': {'active_chores': chore}})


    @staticmethod
    def delete_chore(session_id: str, chore_token: str) -> Dict:
        """
        Deletes a chore.
        Get chore.
        Get the provider_id and client_id from chore.
        Delete chore using chore_id from provider and client.
        delete chore from mongo and from redis
        
        """

        chores_collection = mongo.db.chores
        users_collection = mongo.db.users
        providers_collection = mongo.db.providers

        result = Chores.get_chore(session_id, chore_token)
        if not result:
            return None
        
        error = result.get('error')
        if error:
            return {'error': 'user not found'}
        
        provider_id = result.get('provider_id')
        client_id = result.get('client_id')
        chore_id = result.get('id')

        key = f'chore_{chore_token}'

        if redis_client.exists(key):
            redis_client.delete(key)

        converted_chore = convert_chore_obj(result)
        
        chores_collection.find_one_and_delete({'_id': ObjectId(chore_id)})
        users_collection.find_one_and_update({'_id': ObjectId(client_id)},
                                             {'$pull': {'active_chores': converted_chore}})
        providers_collection.find_one_and_update({'_id': ObjectId(provider_id)},
                                                 {'$pull': {'active_chores': converted_chore}})
        
        return {'success': 'chore deleted'}
