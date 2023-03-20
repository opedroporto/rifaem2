from rifaem2.ext.session import session
from rifaem2.blueprints import view

from flask import Flask

app = Flask(__name__)

session.init_app(app)
view.init_app(app)

if __name__ == "__main__":
    app.run()