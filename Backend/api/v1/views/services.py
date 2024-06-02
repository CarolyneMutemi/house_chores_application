"""
Services view.
"""
from api.v1.views import app_views
from flask import jsonify
from api.v1.utils.servicesUtils import Services


@app_views.route("/services", strict_slashes=False)
def get_all_services():
    """
    Gets all services.
    """
    services = Services.get_all_services()
    for service in services:
        del service['categories']
    return jsonify(services)

@app_views.route("/services/<service_id>", strict_slashes=False)
def get_service_by_id(service_id):
    """
    Returns a service.
    """
    service = Services.get_service_by_id(service_id)
    if not service:
        return jsonify({'error': 'service not found'}), 404
    return jsonify(service)
