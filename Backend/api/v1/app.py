#!/usr/bin/env python3
"""
Main file
"""
from flask import Flask, jsonify
from flask_cors import CORS
from api.v1.views import app_views, mongo

app = Flask(__name__)
app.register_blueprint(app_views)

app.config["MONGO_URI"] = "mongodb://localhost/house_chores"
mongo.init_app(app)

CORS(app)

@app.errorhandler(404)
def not_found(error) -> str:
    """ Not found handler
    """
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(401)
def unauthorized_access(error) -> str:
    """
    Unauthorized access handler.
    """
    return jsonify({"error": "Unauthorized"}), 401


@app.errorhandler(403)
def forbidden(error) -> str:
    """
    Forbidden access.
    """
    return jsonify({"error": "Forbidden"}), 403

@app.errorhandler(409)
def conflict(error) -> str:
    """
    Conflict occurence.
    """
    return jsonify({'error': 'conlict'}), 409

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, threaded=True)
