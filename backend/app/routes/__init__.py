from .book_routes import bp as book_bp
from .user_routes import bp as user_bp
from .default_routes import bp as default_bp
from .review_routes import bp as review_bp
from .booklist_routes import bp as booklist_bp

__all__ = ["book_bp", "user_bp", "default_bp", "review_bp", "booklist_bp"]