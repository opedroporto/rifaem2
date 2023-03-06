import rstr
import base64
from flask import request, render_template

#from .pix.ModeloPix import ModeloPix
from gerencianet import Gerencianet
from rifaem2.credentials import credentials
gn = Gerencianet(credentials.CREDENTIALS)

def init_app(app):
    @app.route("/", methods=["GET"])
    def index():
        return render_template("index.html")

    '''
        IMPLEMENTAÇÃO USANDO A CLASSSE ModeloPix com o uso do token de authenticação (antiga)
    '''
    '''
    @app.route("/pix", methods=["POST"])
    def pix():
        dados = {}
        if request.form.get('cpf'):
            dados['cpf'] = request.form.get('cpf')
        if request.form.get('nome'):
            dados['nome'] = request.form.get('nome')
        if request.form.get('valor'):
            dados['valor'] = request.form.get('valor')

        dados['txid'] = rstr.xeger(r'^[a-zA-Z0-9]{26,35}$')

        payload = {
            "txid": dados['txid'],
            "calendario": {
                "expiracao": 300
            },
            "devedor": {
                "cpf": dados['cpf'],
                "nome": dados['nome']
            },
            "valor": {
                "original": dados['valor']
            },
            "chave": "e5ab195e-c2a5-42db-9ce1-3841e6e22615",
            "solicitacaoPagador": "Obrigado por comprar! Conteúdo da compra:"
        }
        txid = payload.pop("txid")

        pix_model = ModeloPix()
        image64 = pix_model.create_charge(txid, payload)

        return f'<img src="{image64}">'
    '''

    @app.route("/pix", methods=["POST"])
    def pix():
        dados = {}
        if request.form.get('cpf'):
            dados['cpf'] = request.form.get('cpf')
        if request.form.get('nome'):
            dados['nome'] = request.form.get('nome')
        if request.form.get('valor'):
            dados['valor'] = request.form.get('valor')

        dados['txid'] = rstr.xeger(r'^[a-zA-Z0-9]{26,35}$')

        params = {
            'txid': dados['txid']
        }

        body = {
            'calendario': {
                'expiracao': 300
            },
            'devedor': {
                'cpf': dados['cpf'],
                'nome': dados['nome']
            },
            'valor': {
                'original': dados['valor']
            },
            'chave': 'e5ab195e-c2a5-42db-9ce1-3841e6e22615',
            'solicitacaoPagador': 'Cobrança dos serviços prestados.'
        }

        response =  gn.pix_create_charge(params=params,body=body)

        params = {
            'id': response['loc']['id']
        }

        response = gn.pix_generate_QRCode(params=params)
        base64 = response['imagemQrcode']

        return f'<img src="{base64}">'
