from flask import Blueprint, jsonify, request
from app.controllers.booklist_controller import add_book_to_fixed_list, get_books_from_fixed_list
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, BookList

bp = Blueprint("bookslist", __name__, url_prefix="/api/lists")


@bp.post("/favoritos")
@jwt_required()
def agregar_favorito():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    book_id = data.get("book_id")
    if not book_id:
        return jsonify({"error": "book_id is required"}), 400

    _, error = add_book_to_fixed_list(user_id, book_id, "Favoritos")
    if error:
        return jsonify({"error": error}), 400
    return jsonify({"message": "Libro añadido a Favoritos"})

@bp.post("/leidos")
@jwt_required()
def agregar_leido():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    book_id = data.get("book_id")
    if not book_id:
        return jsonify({"error": "book_id is required"}), 400

    _, error = add_book_to_fixed_list(user_id, book_id, "Leídos")
    if error:
        return jsonify({"error": error}), 400
    return jsonify({"message": "Libro marcado como leído"})

@bp.get("/favoritos")
@jwt_required()
def ver_favoritos():
    user_id = get_jwt_identity()
    libros, _ = get_books_from_fixed_list(user_id, "Favoritos")
    return jsonify(libros)

@bp.get("/leidos")
@jwt_required()
def ver_leidos():
    user_id = get_jwt_identity()
    libros, _ = get_books_from_fixed_list(user_id, "Leídos")
    return jsonify(libros)