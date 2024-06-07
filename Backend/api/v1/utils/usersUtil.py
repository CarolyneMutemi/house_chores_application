"""
Users utilities.
"""

import os
from dotenv import load_dotenv
from pymongo import ReturnDocument
from typing import Dict, List
from uuid import uuid4
import requests
import bcrypt
from bson import ObjectId
from pymongo import ReturnDocument
from api.v1.views import mongo, redis_client

load_dotenv()


def _hash_password(password: str) -> bytes:
    """
    Takes in a password string and returns a salted harsh of it.
    """
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())


def _generate_uuid() -> str:
    """
    Returns a string representation of a new UUID.
    """
    return str(uuid4())

class Users:
    """
    Handles users data.
    """
    
    @staticmethod
    def register_user(first_name: str, last_name: str, email: str, password: str) -> Dict:
        """
        Registers user.
        """
        hashed_password = _hash_password(password).decode('utf-8')
        session_id = _generate_uuid()
        user_exists = Users.get_user_by_email(email)
        if user_exists:
            return {'error': 'user exists'}
        api_key = os.getenv('API_KEY')
        params = {'apiKey': api_key, 'emailAddress': email}
        validate_email = requests.get("https://emailverification.whoisxmlapi.com/api/v3",
                                       params=params,
                                       timeout=10)
        is_deliverable = validate_email.json().get('smtpCheck')
        if is_deliverable == 'false':
            return {'error': 'mail undeliverable'}
        users_collection = mongo.db.users
        user = users_collection.insert_one({'first_name': first_name, 'last_name': last_name, 'email': email, 'password': hashed_password, 'active_chores': []})
        expiration_time = 86400
        user_id = str(user.inserted_id)
        redis_client.setex(f'user_{session_id}', expiration_time, user_id)
        return {"session_id": session_id, "expiration_time": expiration_time}


    @staticmethod
    def get_user_by_email(email: str) -> Dict:
        """
        Checks if a user already exists.
        """
        users_collection = mongo.db.users
        user = users_collection.find_one({'email': email})
        if user:
            user['id'] = str(user['_id'])
            del user['_id']
        return user
    

    @staticmethod
    def log_in(email: str, password: str) -> Dict:
        """
        Logs in a user.
        """
        user = Users.get_user_by_email(email)
        if not user:
            return None

        is_password = bcrypt.checkpw(password.encode(), user['password'].encode())
        if not is_password:
            return {'error': 'password incorrect'}

        session_id = _generate_uuid()
        expiration_time = 86400 # 5 minutes
        user_id = user['id']
        redis_client.setex(f'user_{session_id}', expiration_time, user_id )
        return {"session_id": session_id, "expiration_time": expiration_time}


    @staticmethod
    def log_out(session_id: str) -> Dict:
        """
        Logs out a user.
        """
        key = f"user_{session_id}"
        if redis_client.exists(key):
            redis_client.delete(key)
            return {"success": "user session deleted"}
        return None
    
    @staticmethod
    def get_user_id_by_session_id(session_id: str) -> str:
        """
        Gets a user by session_id.
        """
        key = f"user_{session_id}"
        if redis_client.exists(key):
            user_id = redis_client.get(key)
            return user_id.decode('utf-8')
        return None
    
    @staticmethod
    def get_user_from_session_id(session_id: str) -> Dict:
        """
        Gets user.
        """
        user_id = Users.get_user_id_by_session_id(session_id)
        if not user_id:
            return None
        users_collection = mongo.db.users
        try:
            user = users_collection.find_one({'_id': ObjectId(user_id)}, {'password': 0})
            if user:
                user['id'] = str(user['_id'])
                del user['_id']
        except:
            return None
        else:
            return user


    @staticmethod
    def get_user_from_id(user_id: str) -> Dict:
        """
        Gets user.
        """
        users_collection = mongo.db.users
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        return user


    @staticmethod
    def get_my_current_chores(session_id: str) -> List:
        """
        Tracks my chores.
        """
        from api.v1.utils.choresUtilities import Chores
        user = Users.get_user_from_session_id(session_id)
        if not user:
            return None
        user_chores = user.get('active_chores')
        for chore in user_chores:
            chore_token = chore.get('chore_token')
            key = f'chore_{chore_token}'
            if redis_client.exists(key):
                continue
            else:
                Chores.delete_expired_chore(chore)
        updated_user = Users.get_user_from_session_id(session_id)
        return updated_user.get('active_chores')

    @staticmethod
    def post_review(session_id, provider_id, review) -> Dict:
        """
        Post a review.
        """
        user = Users.get_user_from_session_id(session_id)
        if not user:
            return None
        providers_collection = mongo.db.providers
        user_first_name = user.get('first_name')
        review_object = {'client_name': user_first_name, 'review': review}
        provider = providers_collection.find_one_and_update({'_id': ObjectId(provider_id)},
                                                            {'$push': {'reviews': review_object}},
                                                            return_document=ReturnDocument.AFTER)
        provider['id'] = str(provider['_id'])
        del provider['_id']
        return provider
