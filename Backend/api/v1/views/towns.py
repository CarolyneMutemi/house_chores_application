"""
Towns views.
"""
from flask import jsonify
from api.v1.views import app_views
from api.v1.utils.townsUtility import Towns


@app_views.route("/towns", strict_slashes=False)
def get_all_towns():
    """
    Retrieves all towns with registered providers.
    """
    return jsonify(Towns.get_all_towns())
