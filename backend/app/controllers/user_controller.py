from app.models.user import User
from app.models.book_list import BookList
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

    #Listas por defecto
    favoritos = BookList(name="Favoritos", user_id=user.id)
    leidos = BookList(name="Leídos", user_id=user.id)
    db.session.add_all([favoritos, leidos])
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

def authenticate_user(data):
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password, data["password"]):
        return None
    return user

def update_user_preferences(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return None, "User not found"

    genres = data.get("preferred_genre")
    authors = data.get("favorite_authors")

    if genres is not None:
        user.preferred_genre = ",".join(genres) if isinstance(genres, list) else genres
    if authors is not None:
        user.favorite_authors = ",".join(authors) if isinstance(authors, list) else authors

    db.session.commit()
    return user, None

def get_user_preferences(user_id):
    user = User.query.get(user_id)
    if not user:
        return None, "User not found"

    return {
        "preferred_genre": user.preferred_genre.split(",") if user.preferred_genre else [],
        "favorite_authors": user.favorite_authors.split(",") if user.favorite_authors else []
    }, None

from flask_jwt_extended import get_jwt_identity
from app.models import User
from app import db

def get_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return None
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "region": user.region,
        "commune": user.commune,
        "preferred_genre": user.preferred_genre,
        "favorite_authors": user.favorite_authors,
        "description": user.description
    }

def update_user_profile(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return None, "Usuario no encontrado"

    for field in ["name", "region", "commune", "preferred_genre", "favorite_authors", "description"]:
        if field in data:
            setattr(user, field, data[field])

    db.session.commit()
    return user, None
