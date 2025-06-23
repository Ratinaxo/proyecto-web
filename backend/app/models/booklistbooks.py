from app import db

class BookListBooks(db.Model):
    __tablename__ = "BookListBooks"
    list_id = db.Column(db.Integer, db.ForeignKey("BookList.id"), primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey("Book.id"), primary_key=True)
