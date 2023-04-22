import os
import pymongo

#from application.src.hyde.flask_session import Session
from application.ext.flask_session import Session

app_session = Session()

def init_app(app):
    client = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    app.config["SESSION_MONGODB"] = client

    #app.config["SESSION_COOKIE_NAME"] = "session"
    #app.config["SESSION_COOKIE_DOMAIN"] = "rifado2.com"
    #app.config["SESSION_COOKIE_PATH"] = "/"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SECURE"] = True
    #app.config["PERMANENT_SESSION_LIFETIME"]

    app_session.init_app(app)