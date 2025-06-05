import os
from app import create_server, db
from app.models.book import Book
from app.models.user import User
from werkzeug.security import generate_password_hash

# Datos de ejemplo a insertar
BOOKS = [
    {"title": "1984", "author": "George Orwell", "year": 1949},
    {"title": "Clean Code", "author": "Robert C. Martin", "year": 2008},
    {"title": "The Pragmatic Programmer", "author": "Andrew Hunt", "year": 1999},
    {"title": "The Art of Computer Programming", "author": "Donald Knuth", "year": 1968},
    {"title": "Introduction to Algorithms", "author": "Thomas H. Cormen", "year": 2009},
    {"title": "Design Patterns", "author": "Erich Gamma", "year": 1994},
    {"title": "Refactoring", "author": "Martin Fowler", "year": 1999},
    {"title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "year": 1954},
    {"title": "The Catcher in the Rye", "author": "J.D. Salinger", "year": 1951},
    {"title": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960},
    {"title": "Pride and Prejudice", "author": "Jane Austen", "year": 1813},
    {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925},
    {"title": "It", "author": "Stephen King", "year": 1986},
    {"title": "The Hitchhiker's Guide to the Galaxy", "author": "Douglas Adams", "year": 1979},
    {"title": "Brave New World", "author": "Aldous Huxley", "year": 1932},
    {"title": "Fahrenheit 451", "author": "Ray Bradbury", "year": 1953},
    {"title": "The Alchemist", "author": "Paulo Coelho", "year": 1988},
    {"title": "The Da Vinci Code", "author": "Dan Brown", "year": 2003},
    {"title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "year": 1997},
    {"title": "The Hunger Games", "author": "Suzanne Collins", "year": 2008},
    {"title": "Metamorphosis", "author": "Franz Kafka", "year": 1915},
    {"title": "The Picture of Dorian Gray", "author": "Oscar Wilde", "year": 1890},
    {"title": "War and Peace", "author": "Leo Tolstoy", "year": 1869},
    {"title": "Crime and Punishment", "author": "Fyodor Dostoevsky", "year": 1866},
    {"title": "The Brothers Karamazov", "author": "Fyodor Dostoevsky", "year": 1880},
    {"title": "The Count of Monte Cristo", "author": "Alexandre Dumas", "year": 1844},
    #{"title": "The Odyssey", "author": "Homer", "year": -800}, No me la juego
    #{"title": "The Iliad", "author": "Homer", "year": -800},
    
]

USERS = [
    {
    "commune": "Valparaíso",
    "email": "admin@admin.com",
    "isAdmin": True,
    "name": "admin",
    "password": f"{generate_password_hash("admin")}",
    "region": "Valparaíso",
    "rut": "12.345.678-9"
  },
   {
    "commune": "Valparaíso",
    "email": "test@test.com",
    "isAdmin": False,
    "name": f"{generate_password_hash("test")}",
    "password": "test",
    "region": "Valparaíso",
    "rut": "11.111.111-k"
  },
]

def seed():
    app = create_server()
    with app.app_context():
        # Crea el esquema si no existe
        if not os.path.exists("app/db.sqlite"):
            db.create_all()
            print("Base de datos creada.")

        # Inserta libros si no existen
        for data in BOOKS:
            exists = Book.query.filter_by(title=data["title"], author=data["author"]).first()
            if not exists:
                book = Book(**data)
                db.session.add(book)

        # Inserta usuarios si no existen
        for data in USERS:
            exists = User.query.filter_by(rut=data["rut"]).first()
            if not exists:
                user = User(**data)
                db.session.add(user)

        db.session.commit()
        print("Seed completado: libros y usuarios insertados.")

if __name__ == "__main__":
    seed()
