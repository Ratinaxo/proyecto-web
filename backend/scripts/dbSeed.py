import os
from app import create_server, db
from app.models.book import Book
from app.models.user import User
from werkzeug.security import generate_password_hash

BOOKS = [
    {"title": "1984", "author": "George Orwell", "year": 1949, "genre": "Distopía"},
    {"title": "Clean Code", "author": "Robert C. Martin", "year": 2008, "genre": "Tecnología"},
    {"title": "The Pragmatic Programmer", "author": "Andrew Hunt", "year": 1999, "genre": "Tecnología"},
    {"title": "The Art of Computer Programming", "author": "Donald Knuth", "year": 1968, "genre": "Tecnología"},
    {"title": "Introduction to Algorithms", "author": "Thomas H. Cormen", "year": 2009, "genre": "Tecnología"},
    {"title": "Design Patterns", "author": "Erich Gamma", "year": 1994, "genre": "Tecnología"},
    {"title": "Refactoring", "author": "Martin Fowler", "year": 1999, "genre": "Tecnología"},
    {"title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "year": 1954, "genre": "Fantasía"},
    {"title": "The Catcher in the Rye", "author": "J.D. Salinger", "year": 1951, "genre": "Ficción Contemporánea"},
    {"title": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960, "genre": "Ficción Histórica"},
    {"title": "Pride and Prejudice", "author": "Jane Austen", "year": 1813, "genre": "Romance"},
    {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925, "genre": "Ficción Clásica"},
    {"title": "It", "author": "Stephen King", "year": 1986, "genre": "Terror"},
    {"title": "The Hitchhiker's Guide to the Galaxy", "author": "Douglas Adams", "year": 1979, "genre": "Ciencia Ficción"},
    {"title": "Brave New World", "author": "Aldous Huxley", "year": 1932, "genre": "Distopía"},
    {"title": "Fahrenheit 451", "author": "Ray Bradbury", "year": 1953, "genre": "Distopía"},
    {"title": "The Alchemist", "author": "Paulo Coelho", "year": 1988, "genre": "Ficción Filosófica"},
    {"title": "The Da Vinci Code", "author": "Dan Brown", "year": 2003, "genre": "Misterio"},
    {"title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "year": 1997, "genre": "Fantasía"},
    {"title": "The Hunger Games", "author": "Suzanne Collins", "year": 2008, "genre": "Distopía"},
    {"title": "Metamorphosis", "author": "Franz Kafka", "year": 1915, "genre": "Ficción Filosófica"},
    {"title": "The Picture of Dorian Gray", "author": "Oscar Wilde", "year": 1890, "genre": "Ficción Gótica"},
    {"title": "War and Peace", "author": "Leo Tolstoy", "year": 1869, "genre": "Ficción Histórica"},
    {"title": "Crime and Punishment", "author": "Fyodor Dostoevsky", "year": 1866, "genre": "Ficción Psicológica"},
    {"title": "The Brothers Karamazov", "author": "Fyodor Dostoevsky", "year": 1880, "genre": "Filosofía"},
    {"title": "The Count of Monte Cristo", "author": "Alexandre Dumas", "year": 1844, "genre": "Aventura"}
]


USERS = [
    {
        "commune": "Valparaíso",
        "email": "admin@admin.com",
        "isAdmin": True,
        "name": "admin",
        "password": generate_password_hash("admin"),
        "region": "Valparaíso",
        "rut": "12.345.678-9",
        "preferred_genre": "Fantasía",
        "favorite_authors": "J.R.R. Tolkien, George Orwell",
        "description": "Administrador de la aplicación, encargado de gestionar usuarios y contenido.",
    },
    {
        "commune": "Valparaíso",
        "email": "test@test.com",
        "isAdmin": False,
        "name": "test",
        "password": generate_password_hash("test"),
        "region": "Valparaíso",
        "rut": "11.111.111-k",
        "preferred_genre": "Ciencia Ficción",
        "favorite_authors": "Isaac Asimov, Philip K. Dick",
        "description": "Usuario de prueba para la aplicación.",
    }
]

def seed():
    app = create_server()
    with app.app_context():
        if not os.path.exists("app/db.sqlite"):
            db.create_all()
            print("Base de datos creada.")
        else:
            print("Base de datos ya existe.")

        for data in BOOKS:
            exists = Book.query.filter_by(title=data["title"], author=data["author"]).first()
            if not exists:
                book = Book(**data)
                db.session.add(book)

        for data in USERS:
            exists = User.query.filter_by(rut=data["rut"]).first()
            if not exists:
                user = User(**data)
                db.session.add(user)

        db.session.commit()
        print("Seed completado: libros y usuarios insertados.")

if __name__ == "__main__":
    seed()
