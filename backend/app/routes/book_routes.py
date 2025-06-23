from flask import Blueprint, jsonify, request
from app.controllers.book_controller import *
from app.models.schemas import BookSchema
from flask_jwt_extended import jwt_required, get_jwt_identity

book_schema = BookSchema()
books_schema = BookSchema(many=True)
bp = Blueprint("books", __name__, url_prefix="/api/books")

@bp.get("/")
def get_books():
    """
    Get all books
    """
    return books_schema.jsonify(get_all_books()), 200

@bp.get("/<int:book_id>")
def get_book(book_id):
    """
    Get a book by id
    """
    return book_schema.jsonify(get_a_book(book_id)), 200

@bp.post("/")
def add_book():
    """
    Add a new book
    """
    data = request.get_json() or {}
    required_fields = ["title", "author", "year"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
    return jsonify(add_a_book(data)), 201

@bp.patch("/<int:book_id>")
def update_book(book_id):
    """
    Update a book by id
    """
    data = request.get_json() or {}
    return jsonify(update_a_book(book_id, data)), 200

@bp.delete("/<int:book_id>")
def delete_book(book_id):
    """
    Delete a book by id
    """
    return jsonify(delete_a_book(book_id)), 200


@bp.get("/search")
def search():
    filters = request.args.to_dict()
    results, error = search_books(filters)
    if error:
        return jsonify({"error": error}), 400
    return jsonify(results)

@bp.get("/recommendations")
@jwt_required()
def recommendations():
    user_id = get_jwt_identity()
    results, error = get_recommendations(user_id)
    if error:
        return jsonify({"error": error}), 404
    return jsonify(results)