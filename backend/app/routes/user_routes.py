from app.models import User
from app.controllers.user_controller import register_user, authenticate_user, get_user_preferences, update_user_preferences, update_user_profile
from app.models.schemas import UserSchema
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError

user_schema = UserSchema()
users_schema = UserSchema(many=True)

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
    print("JWT ID:", get_jwt_identity())
    user = User.query.get(current_user)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return user_schema.jsonify(user), 200

@bp.get("/")
@jwt_required()
def get_users():
    """
    Get all users with optional pagination: ?page=1&per_page=10
    """
    try:
        page = request.args.get("page", default=1, type=int)
        per_page = request.args.get("per_page", default=10, type=int)

        pagination = User.query.paginate(page=page, per_page=per_page, error_out=False)
        users = pagination.items

        return jsonify({
            "users": users_schema.dump(users),
            "total": pagination.total,
            "page": pagination.page,
            "pages": pagination.pages
        }), 200

    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

@bp.get("/<int:user_id>")
@jwt_required()
def get_user(user_id):
    """
    Get a user by id
    """
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return user_schema.jsonify(user), 200

@bp.put("/preferences")
@jwt_required()
def preferences_update():
    current_user_id = get_jwt_identity()
    data = request.get_json() or {}

    updated_user, error = update_user_preferences(current_user_id, data)
    if error:
        return jsonify({"error": error}), 404

    return jsonify({
        "message": "Preferences updated successfully",
        "user": updated_user.to_dict()
    })

@bp.get("/preferences")
@jwt_required()
def preferences_get():
    current_user_id = get_jwt_identity()

    prefs, error = get_user_preferences(current_user_id)
    if error:
        return jsonify({"error": error}), 404

    return jsonify(prefs)

@bp.put("/profile")
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    data = request.get_json() or {}

    updated_user, error = update_user_profile(current_user_id, data)
    if error:
        return jsonify({"error": error}), 404

    return jsonify({
        "message": "Profile updated successfully",
        "user": updated_user.to_dict()
    })