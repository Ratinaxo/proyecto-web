from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

db = SQLAlchemy()
migrate = Migrate()

def create_server():
	"""Create and configure the Flask serverlication."""
	load_dotenv()
	server = Flask(__name__)
	CORS(server)
	server.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
	
	db.init_app(server)
	migrate.init_app(server, db)
	
 	# Register the models to the db
  
	import app.models
	import app.routes as routes
	
	for bp in getattr(routes, "__all__", []):
		try:
			# Register the blueprint
			server.register_blueprint(getattr(routes, bp))
		except SystemError as e:
			print(f"Error registering blueprint {bp}, server not created!: {e}")

	return server