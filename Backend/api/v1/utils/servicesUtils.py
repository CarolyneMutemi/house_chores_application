"""
Services utilities.
"""

from typing import List, Dict
from api.v1.views import mongo

class Services:
    """
    Retrieve services data.
    """
    all_services = []

    @staticmethod
    def query_services():
        """
        Updates all_services when a change is made, otherwise use the class variable.
        """
        if len(Services.all_services) == 0:
            services_collection = mongo.db.services
            cursor = services_collection.find()
            services = []
            for service in cursor:
                service['id'] = str(service['_id'])
                del service['_id']
                services.append(service)
            Services.all_services = services

    @staticmethod
    def get_all_services() -> List:
        """
        Retrieves all services from the database.
        """
        Services.query_services()
        return Services.all_services

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
