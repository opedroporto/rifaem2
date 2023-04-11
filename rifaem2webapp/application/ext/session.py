import os
import pymongo

from flask_session import Session

app_session = Session()

def init_app(app):

    client = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    app.config["SESSION_MONGODB"] = client

    app_session.init_app(app)