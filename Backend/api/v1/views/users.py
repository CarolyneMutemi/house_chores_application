"""
Users views.
"""

from flask import jsonify, request
from api.v1.views import app_views
from api.v1.utils.usersUtil import Users


@app_views.route('/user/<session_id>', strict_slashes=False)
def get_user_by_session(session_id):
    """
    Get user by session_id.
    """
    user = Users.get_user_from_session_id(session_id)
    if not user:
        return jsonify({'error': 'user not found'}), 403
    return jsonify(user)


@app_views.route('/register', strict_slashes=False, methods=['POST'])
def register_client():
    """
    Registers a client.
    """
    if request.content_type != 'application/json':
        response = jsonify({"error": "Unsupported Media Type"})
        response.status_code = 415
        return response
    first_name = request.json.get('first_name')
    if not first_name:
        return jsonify({'error': 'first_name missing'}), 400
    last_name = request.json.get('last_name')
    if not last_name:
        return jsonify({'error': 'last_name missing'}), 400
    email = request.json.get('email')
    if not email:
        return jsonify({'error': 'email missing'}), 400
    password = request.json.get('password')
    if not password:
        return jsonify({'error': 'password missing'}), 400
    result = Users.register_user(first_name, last_name, email, password)
    error = result.get('error', None)
    if error == 'user exists':
        return jsonify(result), 409
    if error == 'mail undeliverable':
        return jsonify(result), 403
    return jsonify(result), 200


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def user_login():
    """
    Log in endpoint.
    """
    email = request.json.get('email')
    password = request.json.get('password')

    if not email:
        return jsonify({'error': 'missing email'}), 403
    if not password:
        return jsonify({'error': 'missing password'}), 403

    result = Users.log_in(email, password)
    if not result:
        return jsonify({'error': 'email not found'}), 403
    if 'error' in result:
        return jsonify(result), 403
    return jsonify(result)


@app_views.route('/logout/<session_id>', strict_slashes=False)
def logout(session_id):
    """
    Logs out a user.
    """
    result = Users.log_out(session_id)

    if not result:
        return jsonify({'error': 'user not found'}), 403
    return jsonify(result)



@app_views.route('/my_chores/<session_id>', strict_slashes=False)
def get_my_chores(session_id):
    """
    Get my chores.
    """
    result = Users.get_my_current_chores(session_id)
    if result is None:
        return jsonify({'error': 'user not found'}), 403
    return jsonify(result)


@app_views.route('/post_review/<session_id>/<provider_id>', methods=['POST'], strict_slashes=False)
def post_review(session_id, provider_id):
    """
    Posts a review.
    """
    review = request.json.get('review')
    if not review:
        return jsonify({'error': 'review missing'}), 403
    result = Users.post_review(session_id, provider_id, review)

    if not result:
        return jsonify({'error': 'user or provider not found'}), 403
    return jsonify(result)
