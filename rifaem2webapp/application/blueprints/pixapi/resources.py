import requests
import os

headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": os.getenv("PIX_API_APP_ID"),
    "X-Parse-REST-API-Key": os.getenv("PIX_API_REST_KEY"),
    "X-Parse-Session-Token": os.getenv("PIX_API_TOKEN"),
}

def carrega_rifas(pagina: int=0, quantidade: int=0):
    """carrega rifas baseado no número da página e quantidade de rifas por página"""
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
    
def faz_pedido(data):
    url = os.getenv("PIX_API_URL") + "pedido"
    resposta = requests.post(url, json=data, headers=headers)
    resposta = resposta.json()

    return resposta

def lista_pedidos(pedidosTxid):
    url = os.getenv("PIX_API_URL") + "lista-pedidos"
    data = {"pedidosTxid": []}
    for txid in pedidosTxid:
        data['pedidosTxid'].append(txid)

    resposta = requests.post(url, json=data, headers=headers)
    resposta = resposta.json()['result']
    resposta = list(filter(lambda pedido: pedido is not None, resposta))

    if resposta:
        resposta.reverse()
        return resposta

    return []

def nome_rifa(id):
    url = os.getenv("PIX_API_URL") + "nome-rifa"
    data = {"id": id}

    resposta = requests.post(url, json=data, headers=headers)
    nome = resposta.json()['result']

    return nome

def get_dados_comprador(txid):
    url = os.getenv("PIX_API_URL") + "get-pedido-comprador"
    data = {"txid": txid}

    resposta = requests.post(url, json=data, headers=headers)
    resposta = resposta.json()['result']

    return resposta