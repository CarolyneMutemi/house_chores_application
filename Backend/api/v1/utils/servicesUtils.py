"""
Services utilities.
"""

from ast import literal_eval
from typing import List, Dict
from api.v1.views import mongo, redis_client


class Services:
    """
    Retrieve services data.
    """

    @staticmethod
    def get_services_from_mongo() -> List:
        """
        Gets services from MongoDB database.
        """
        services_collection = mongo.db.services
        cursor = services_collection.find()
        services = []
        for service in cursor:
            service['id'] = str(service['_id'])
            del service['_id']
            services.append(service)
        redis_client.set('all_services', str(services))
        return services

    @staticmethod
    def get_all_services() -> List:
        """
        Retrieves all services from the database.
        """
        services = redis_client.get('all_services')
        if not services:
            return Services.get_services_from_mongo()
        return literal_eval(services.decode('UTF-8'))

    @staticmethod
    def get_service_by_id(service_id: str) -> Dict:
        """
        Retrieve service by id.
        """
        all_services = Services.get_all_services()
        for service in all_services:
            if service['id'] == service_id:
                return service
        return None
