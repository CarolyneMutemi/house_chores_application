"""
Towns utilities.
"""

from typing import List, Dict
from api.v1.views import mongo


class Towns:
    """
    Gets towns data.
    """
    all_towns = []

    @staticmethod
    def query_providers():
        """
        Updates the Towns.all_towns class variable when a change occurs.
        """
        if len(Towns.all_towns) == 0:
            towns_collection = mongo.db.towns
            cursor = towns_collection.find()
            towns = []
            for town in cursor:
                town['id'] = str(town['_id'])
                del town['_id']
                towns.append(town)
            Towns.all_towns = towns

    @staticmethod
    def get_all_towns() -> List:
        """
        Retrieves all towns.
        """
        Towns.query_providers()
        return Towns.all_towns

    @staticmethod
    def get_town_by_id(town_id: str) -> Dict:
        """
        Retrieves a town by it's id.
        """
        all_towns = Towns.get_all_towns()
        for town in all_towns:
            if town['id'] == town_id:
                return town
        return None
