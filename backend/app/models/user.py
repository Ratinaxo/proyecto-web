from app import db

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    isAdmin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    rut = db.Column(db.String(12), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)

    region = db.Column(db.String(255), nullable=False)
    commune = db.Column(db.String(255), nullable=False)
    preferred_genre = db.Column(db.String(255), nullable=True)
    favorite_authors = db.Column(db.String(255), nullable=True)
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    
    
    def __repr__(self):
        return f"<Name {self.name}, RUT {self.rut}"
    
    def to_dict(self):
        return {
            "id": self.id,
            "isAdmin": self.isAdmin,
            "created_at": self.created_at,
            "name": self.name,
            "password": self.password,
            "email": self.email,
            "rut": self.rut,
            "region": self.region,
            "commune": self.commune,
            "preferred_genre": self.preferred_genre,
            "favorite_authors": self.favorite_authors,
            "description": self.description
        }