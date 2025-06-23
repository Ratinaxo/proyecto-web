from app import db

class BookList(db.Model):
    __tablename__ = "BookList"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable=False)

    user = db.relationship("User", backref="book_lists")
    books = db.relationship("Book", secondary="BookListBooks", backref="in_lists")
