from flask import session

def iniciaPedidos():
    session['pedidos'] = []

def addPedido(pedido):
    if not "pedidos" in session:
        iniciaPedidos()

    pedidos = session['pedidos']
    pedidos.append(pedido)
    session['pedidos'] = pedidos

def getPedidos():
    if "pedidos" in session:
        return session['pedidos']
    return []