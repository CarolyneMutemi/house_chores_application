"""
Services view.
"""
from api.v1.views import app_views, mongo
from flask import jsonify


@app_views.route("/services", strict_slashes=False)
def get_all_services():
    """
    Gets all services.
    """
    services_collection = mongo.db.services
    services_object = services_collection.find({}, { "categories": 0})
    services = []

    for service in services_object:
        service['id'] = str(service['_id'])
        del service['_id']
        services.append(service)

    return jsonify(services)
