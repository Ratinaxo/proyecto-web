# controllers/review_controller.py
from flask import request, jsonify
from app.models.review import Review
from app.models.book import Book
from app.models.user import User
from app import db

def create_review():
    data = request.get_json()
    user_id = data.get('user_id')
    book_id = data.get('book_id')
    rating = data.get('rating')
    comment = data.get('comment')

    if not (1 <= rating <= 5):
        return jsonify({'error': 'Rating debe estar entre 1 y 5'}), 400

    # Verificar si ya existe reseña del mismo usuario para el mismo libro
    existing_review = Review.query.filter_by(user_id=user_id, book_id=book_id).first()
    if existing_review:
        return jsonify({'error': 'Ya has reseñado este libro'}), 409

    review = Review(user_id=user_id, book_id=book_id, rating=rating, comment=comment)
    db.session.add(review)
    db.session.commit()

    return jsonify({'message': 'Reseña guardada correctamente'}), 201

def get_reviews_for_book(book_id):
    reviews = Review.query.filter_by(book_id=book_id).all()
    return jsonify([{
        'user_id': r.user_id,
        'rating': r.rating,
        'comment': r.comment,
        'created_at': r.created_at.isoformat()
    } for r in reviews])
