"""
Providers views.
"""
from flask import jsonify
from api.v1.views import app_views
from api.v1.utils.providersUtils import Providers
from api.v1.utils.townsUtility import Towns


@app_views.route("/providers", strict_slashes=False)
def all_providers():
    """
    Retrieves all providers.
    """
    return jsonify(Providers.get_all_providers())


@app_views.route("/providers/<service_id>", strict_slashes=False)
def providers_of_service(service_id):
    """
    Retrieves providers of specific service.
    """
    providers_list = Providers.get_providers_of_service(service_id)
    if providers_list is None:
        return jsonify({"error": "service not found"}), 404
    return jsonify(providers_list)


@app_views.route('/providers/<service_id>/<town_id>', strict_slashes=False)
def providers_of_service_in_town(service_id, town_id):
    """
    Retrieves providers of service in a specific town.
    """
    providers_list = Providers.get_providers_of_service(service_id)
    if providers_list is None:
        return jsonify({"error": "service not found"}), 404
    if len(providers_list) == 0:
        return jsonify([])

    town = Towns.get_town_by_id(town_id)
    if not town:
        return jsonify({'error': "town not found"}), 404
    providers_in_town = []
    for provider in providers_list:
        if town['name'] in provider['location']:
            providers_in_town.append(provider)
    return jsonify(providers_in_town)
