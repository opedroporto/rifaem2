import os

from flask import Flask

from .app.ext.session import session
from .app.ext.csfr import csfr
from .app.blueprints import view



def create_app():
    """Cria e configura uma instância da aplicação Flask."""

    app = Flask(__name__, template_folder="app/templates",
                static_folder="app/static")
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['WTF_CSRF_SECRET_KEY'] = os.getenv("WTF_CSRF_SECRET_KEY")

    session.init_app(app)
    csfr.init_app(app)
    view.init_app(app)

    return app
