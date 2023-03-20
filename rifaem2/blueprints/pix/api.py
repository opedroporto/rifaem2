import requests
import json
import os

headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": os.getenv("PIX_API_APP_ID"),
    "X-Parse-REST-API-Key": os.getenv("PIX_API_REST_KEY"),
    "X-Parse-Session-Token": os.getenv("PIX_API_TOKEN"),
}

def carregaRifas(pagina=0, quantidade=0):
    try:
        url = os.getenv("PIX_API_URL") + "lista-rifas"
        data = {
            "pagina": pagina,
            "quantidade": quantidade
        }
        resposta = requests.post(url, json=data, headers=headers)
        resposta = resposta.json()['result']

        return resposta
        
    except:
        return {}
    
def pedido(data):
    url = os.getenv("PIX_API_URL") + "pedido"
    resposta = requests.post(url, json=data, headers=headers)
    resposta = resposta.json()

    return resposta

def listaPedidos(pedidosTxid):
    url = os.getenv("PIX_API_URL") + "lista-pedidos"
    data = {"pedidosTxid": []}
    for txid in pedidosTxid:
        data['pedidosTxid'].append(txid)

    resposta = requests.post(url, json=data, headers=headers)
    resposta = resposta.json()['result']
    resposta.reverse()

    return resposta
