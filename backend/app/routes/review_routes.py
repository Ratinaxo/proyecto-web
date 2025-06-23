from flask import Blueprint
from app.controllers import review_controller

bp = Blueprint("reviews", __name__, url_prefix="/api/reviews")

@bp.post("/")
def create_review():
    return review_controller.create_review()

@bp.get("/<int:book_id>")
def get_reviews(book_id):
    return review_controller.get_reviews_for_book(book_id)
