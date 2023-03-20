from flask import session
from flask_session import Session


def init_app(app):
    app.config["SESSION_TYPE"] = "filesystem"
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