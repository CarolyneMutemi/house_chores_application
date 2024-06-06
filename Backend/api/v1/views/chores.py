"""
Chores view.
"""

from flask import jsonify, request
from api.v1.views import app_views
from api.v1.utils.choresUtilities import Chores


@app_views.route('/create_chore/<session_id>', methods=['POST'], strict_slashes=False)
def create_chore(session_id):
    """
    Creates a chore and returns a chore_token.
    """
    service_id = request.json.get('service_id')
    if not service_id:
        return jsonify({'error': 'service_id missing'}), 403
    
    provider_id = request.json.get('provider_id')
    if not provider_id:
        return jsonify({'error': 'provider_id missing'}), 403
    
    date = request.json.get('date')
    if not date:
        return jsonify({'error': 'date missing'}), 403

    result = Chores.add_chore(service_id, provider_id, date, session_id)
    if not result:
        return jsonify({'error': 'user or provider or service not found'}), 403
    error = result.get('error')
    if error:
        return jsonify(result), 403
    return jsonify(result)


@app_views.route('/delete_chore/<session_id>/<chore_token>', methods = ['DELETE'], strict_slashes=False)
def delete_chore(session_id, chore_token):
    """
    Deletes a chore.
    """
    if not chore_token:
        return jsonify({'error': 'chore_token missing'}), 400
    result = Chores.delete_chore(session_id, chore_token)
    if not result:
        return jsonify({'error': 'chore not found'}), 403
    error = result.get('error')
    if error == 'user not found':
        return jsonify(result), 403
    return jsonify(result)


@app_views.route('/get_chore/<session_id>/<chore_token>', strict_slashes=False)
def get_chore(session_id, chore_token):
    """
    Gets a chore.
    """
    result = Chores.get_chore(session_id, chore_token)
    if not result:
        return jsonify({'error': 'chore not found'}), 403
    error = result.get('error')
    if error == 'user not found':
        return jsonify(result), 403
    return jsonify(result)
