from app import marsh
from app.models import User, Book

class UserSchema(marsh.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ("password",)
        
class BookSchema(marsh.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        load_instance = True
        include_fk = True  # Include foreign keys if any
