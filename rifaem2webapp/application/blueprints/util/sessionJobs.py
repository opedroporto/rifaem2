from threading import Thread
from flask import session

def async_inicia_pedidos():
    def inicia_pedidos():
        session['pedidos'] = []

    thr = Thread(target=inicia_pedidos, args=[])
    thr.start()

def async_add_pedido(pedido):
    def add_pedido():
        if "pedidos" not in session:
            async_inicia_pedidos()

        pedidos = session['pedidos']
        pedidos.append(pedido)
        session['pedidos'] = pedidos

    thr = Thread(target=add_pedido, args=[])
    thr.start()

def async_get_pedidos():
    def get_pedidos():
        if "pedidos" in session:
            return session['pedidos']
        return []
    
    thr = Thread(target=get_pedidos, args=[])
    thr.start()