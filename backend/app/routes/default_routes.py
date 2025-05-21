from flask import redirect, Blueprint, jsonify

bp = Blueprint("root", __name__, url_prefix="/")
@bp.route("/")
def root():
	return "<p>Welcome to the Book API! Use /api/books to access the books endpoint.</p>"

@bp.route("/api")
@bp.route("/api/")
def to_root():
    return redirect("/", 302)