from .book_routes import bp as book_bp
#from .user_routes import bp as user_bp
from .default_routes import bp as default_bp

__all__ = ["book_bp", "default_bp"]