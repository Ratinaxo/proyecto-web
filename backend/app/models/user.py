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
    region = db.Column(db.String(255), nullable=False)
    commune = db.Column(db.String(255), nullable=False)
 
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
            "commune": self.commune
        }