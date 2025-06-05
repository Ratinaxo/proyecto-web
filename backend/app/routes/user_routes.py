from app.models import User
from app.controllers.user_controller import register_user, authenticate_user
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

bp = Blueprint("users", __name__, url_prefix="/api/users")

@bp.post("/register")
def register():
    data = request.get_json() or {}
    if not data:
        return jsonify({"error": "No data provided"}), 400
    required = ["name", "password", "email", "rut", "region", "commune"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
    return register_user(data)

@bp.post("/login")
def login():
    data = request.get_json() or {}
    if "email" not in data or "password" not in data:
        return jsonify({"error": "Missing email or password"}), 400
    user = authenticate_user(data)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 200

@bp.get("/me")
@jwt_required()
def me():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200

@bp.get("/")
@jwt_required()
def get_users():
    """
    Get all users
    """
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@bp.get("/<int:user_id>")
@jwt_required()
def get_user(user_id):
    """
    Get a user by id
    """
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200