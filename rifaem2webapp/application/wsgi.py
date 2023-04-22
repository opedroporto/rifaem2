
"""
    Cria e configura uma instância da aplicação Flask
"""
from gevent import monkey
monkey.patch_all()

from flask import Flask

from application.ext import configuration
from application.ext import sse
from application.ext import session
from application.ext import email
from application.ext import csrf
from application.ext import errorhandler
from application.blueprints.views import views
from application.blueprints.util import helpers

def create_app():
    """
        Cria e configura uma instância da aplicação Flask usando o Factory Pattern
    """
    app = Flask(__name__)

    configuration.init_app(app)
    helpers.init_app(app)
    sse.init_app(app)
    session.init_app(app)
    email.init_app(app)
    views.init_app(app)
    csrf.init_app(app)
    errorhandler.init_app(app)

    return app

app = create_app()
