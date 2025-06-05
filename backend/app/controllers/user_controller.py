from app.models.user import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify

def register_user(data):
    if User.query.filter_by(email=data["email"]).first():
        return {"error": "Email already exists"}, 304
    if User.query.filter_by(rut=data["rut"]).first():
        return {"error": "RUT already exists"}, 304

    hashed_password = generate_password_hash(data["password"])
    user = User(
        name=data["name"],
        password=hashed_password,
        email=data["email"],
        rut=data["rut"],
        region=data["region"],
        commune=data["commune"]
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

def authenticate_user(data):
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password, data["password"]):
        return None
    return user