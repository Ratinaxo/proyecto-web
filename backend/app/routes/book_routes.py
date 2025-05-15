from flask import Blueprint, jsonify, request
from app.controllers.book_controller import *

bp = Blueprint("books", __name__, url_prefix="/api/books")

@bp.get("/")
def get_books():
    """
    Get all books
    """
    return jsonify(get_all_books()), 200

@bp.get("/<int:book_id>")
def get_book(book_id):
    """
    Get a book by id
    """
    return jsonify(get_a_book(book_id)), 200

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


