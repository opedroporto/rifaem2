import os
import pymongo

from flask import session
from flask_session import Session


def init_app(app):

    client = pymongo.MongoClient(os.getenv("MONGODB_URI"))
    app.config["SESSION_TYPE"] = "mongodb"
    app.config["SESSION_MONGODB"] = client
    app.config["SESSION_MONGODB_DB"] = os.getenv("MONGODB_DATABASE")
    app.config["SESSION_MONGODB_COLLECT"] = os.getenv("MONGODB_COLLECTION")

    Session(app)

def addSessionVar(key, value):
    session[key] = value

def getSessionVar(key):
    return session[key]

def iniciaPedidos():
    session['pedidos'] = []

def addPedido(pedido):
    if not "pedidos" in session:
        iniciaPedidos()

    pedidos = session['pedidos']
    pedidos.append(pedido)
    session['pedidos'] = pedidos

def pedidos():
    if "pedidos" in session:
        return session['pedidos']
    return []