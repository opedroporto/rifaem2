import os

from flask import Flask

from application.ext.session import session
from application.ext.csfr import csfr
from application.blueprints.util import util
from application.blueprints.view import view


def create_app():
    """Cria e configura uma instância da aplicação Flask."""

    app = Flask(__name__, template_folder="application/templates",
                static_folder="application/static")
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['WTF_CSRF_SECRET_KEY'] = os.getenv("WTF_CSRF_SECRET_KEY")

    util.init_app(app)
    session.init_app(app)
    csfr.init_app(app)
    view.init_app(app)

    return app

app = create_app()

if __name__ == "__main__":
    app.run()