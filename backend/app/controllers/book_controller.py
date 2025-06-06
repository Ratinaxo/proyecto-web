from app.models.book import Book
from app import db

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