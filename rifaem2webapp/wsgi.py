from app.ext.session import session
from app.blueprints import view

from flask import Flask

app = Flask(__name__, template_folder="app/templates", static_folder="app/static")

session.init_app(app)
view.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)