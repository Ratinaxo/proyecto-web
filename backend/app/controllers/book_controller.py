from app.models.book import Book
from app import db
from app.models import Book, User, BookList
from sqlalchemy import or_

def get_all_books():
    return Book.query.all()

def get_a_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return {"error": "Book not found!"}
    return book

def add_a_book(data):
    new_book = Book(
        title=data["title"],
        author=data["author"],
        year=data["year"]
    )
    db.session.add(new_book)
    db.session.commit()
    return new_book

def update_a_book(book_id, data):
    book = Book.query.get(book_id)
    if not book:
        return ({"error": "Book id not found!"}), 404
    if "title" in data:
        book.title = data["title"]
    if "author" in data:
        book.author = data["author"]
    if "year" in data:
        book.year = data["year"]
    db.session.commit()
    return book

def delete_a_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return {"error": "Book id not found!"}
    db.session.delete(book)
    db.session.commit()
    return {"message": "Book deleted successfully!"}

def search_books(filters):
    query = Book.query

    if "title" in filters:
        query = query.filter(Book.title.ilike(f"%{filters['title']}%"))
    if "author" in filters:
        query = query.filter(Book.author.ilike(f"%{filters['author']}%"))
    if "genre" in filters:
        query = query.filter(Book.genre.ilike(f"%{filters['genre']}%"))
    if "year" in filters:
        try:
            query = query.filter(Book.year == int(filters["year"]))
        except ValueError:
            return [], "Year must be an integer"

    return [book.to_dict() for book in query.all()], None

def get_recommendations(user_id):
    favoritos = BookList.query.filter_by(user_id=user_id, name="Favoritos").first()
    leidos = BookList.query.filter_by(user_id=user_id, name="Leídos").first()

    if not favoritos or not favoritos.books:
        return [], "No hay libros favoritos para recomendar"

    favoritos_ids = [b.id for b in favoritos.books]
    leidos_ids = [b.id for b in leidos.books] if leidos else []

    favoritos_books = Book.query.filter(Book.id.in_(favoritos_ids)).all()
    generos = {b.genre for b in favoritos_books if b.genre}
    autores = {b.author for b in favoritos_books if b.author}

    recomendados = Book.query.filter(
        ~Book.id.in_(favoritos_ids + leidos_ids),
        (Book.genre.in_(generos) | Book.author.in_(autores))
    ).limit(20).all()

    return [b.to_dict() for b in recomendados], None