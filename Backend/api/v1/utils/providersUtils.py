"""
Providers utility file.
"""

from bson import ObjectId
from typing import List, Dict
from api.v1.views import mongo
from api.v1.utils.servicesUtils import Services
from api.v1.utils.usersUtil import Users

class Providers:
    """
    Handles Providers queries.
    """
    all_providers = []

    @staticmethod
    def query_providers():
        """
        Updates the Providers.all_providers list
        """
        if len(Providers.all_providers) == 0:
            providers_collection = mongo.db.providers
            cursor = providers_collection.find({}, {'active_chores': 0})
            providers = []
            for provider in cursor:
                provider['id'] = str(provider['_id'])
                del provider['_id']
                providers.append(provider)
            Providers.all_providers = providers

    @staticmethod
    def get_all_providers() -> List:
        """
        Retrieves the list of all providers.
        """
        Providers.query_providers()
        return Providers.all_providers

    @staticmethod
    def get_providers_of_service(service_id: str) -> List:
        """
        Retrieve providers offering a specific service.
        """
        service = Services.get_service_by_id(service_id)
        if not service:
            return None
        all_providers = Providers.get_all_providers()
        providers_of_service = []
        for provider in all_providers:
            if service['name'] in provider['services']:
                providers_of_service.append(provider)
        return providers_of_service
    
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
