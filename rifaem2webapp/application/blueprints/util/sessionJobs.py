from threading import Thread
from flask import session

def inicia_pedidos():
    session['pedidos'] = []

def add_pedido(pedido):
    if "pedidos" not in session:
        inicia_pedidos()

    pedidos = session['pedidos']
    pedidos.append(pedido)
    session['pedidos'] = pedidos

def get_pedidos():
    if "pedidos" in session:
        return session['pedidos']
    return []