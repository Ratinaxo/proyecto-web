from app.models import User, BookList, BookListBooks
from app import db
from flask import jsonify


def get_or_create_fixed_list(user_id, name):
    lista = BookList.query.filter_by(user_id=user_id, name=name).first()
    if not lista:
        lista = BookList(name=name, user_id=user_id)
        db.session.add(lista)
        db.session.commit()
    return lista

def add_book_to_fixed_list(user_id, book_id, list_name):
    lista = get_or_create_fixed_list(user_id, list_name)

    exists = BookListBooks.query.filter_by(list_id=lista.id, book_id=book_id).first()
    if exists:
        return lista, "Book already in list"

    entry = BookListBooks(list_id=lista.id, book_id=book_id)
    db.session.add(entry)
    db.session.commit()
    return lista, None

def get_books_from_fixed_list(user_id, list_name):
    lista = BookList.query.filter_by(user_id=user_id, name=list_name).first()
    if not lista:
        return [], None
    return [b.to_dict() for b in lista.books], None
