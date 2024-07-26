"""
Providers utility file.
"""

from ast import literal_eval
from bson import ObjectId
from typing import List, Dict
from api.v1.views import mongo, redis_client
from api.v1.utils.servicesUtils import Services

class Providers:
    """
    Handles Providers queries.
    """

    @staticmethod
    def get_all_providers():
        """
        Updates the Providers.all_providers list
        """
        providers_collection = mongo.db.providers
        cursor = providers_collection.find({}, {'active_chores': 0})
        providers = []
        for provider in cursor:
            provider['id'] = str(provider['_id'])
            del provider['_id']
            providers.append(provider)
        return providers


    @staticmethod
    def get_providers_of_service(service_id: str) -> List:
        """
        Retrieve providers offering a specific service.
        """
        service = Services.get_service_by_id(service_id)
        if not service:
            return None
        all_providers = Providers.get_all_providers()
        providers_of_service = redis_client.get(f"service_{service_id}")
        if not providers_of_service:
            providers_of_service = []
            for provider in all_providers:
                if service['name'] in provider['services']:
                    providers_of_service.append(provider)
            redis_client.set(f"service_{service_id}", str(providers_of_service))
            return providers_of_service
        return literal_eval(providers_of_service.decode('utf-8'))
    
    @staticmethod
    def get_provider_from_id(provider_id) -> Dict:
        """
        Retrieve service by name.
        """
        providers_collection = mongo.db.providers
        try:
            provider = providers_collection.find_one({'_id': ObjectId(provider_id)})
            provider['id'] = str(provider['_id'])
            del provider['_id']
        except:
            return None
        return provider
