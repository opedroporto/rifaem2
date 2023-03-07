import rstr
import base64

from flask import request, render_template
from rifaem2.credentials import credentials

from .pix.ModeloPix import ModeloPix



def init_app(app):
    @app.route("/", methods=["GET"])
    def index():
        return render_template("index.html")

    @app.route("/requisitarcompra", methods=["POST"])
    def requisitarcompra():
        pix = ModeloPix()

        dados = {}
        if request.form.get('cpf'):
            dados['cpf'] = request.form.get('cpf')
        if request.form.get('nome'):
            dados['nome'] = request.form.get('nome')
        if request.form.get('telefone'):
            dados['telefone'] = request.form.get('telefone')
        if request.form.get('email'):
            dados['email'] = request.form.get('email')
        if request.form.get('preco'):
            dados['preco'] = request.form.get('preco')

        txid = rstr.xeger(r'^[a-zA-Z0-9]{26,35}$')

        response = pix.gerapix({
            'preco': dados['preco'],
            'txid': txid
        })

        loc_id = response['loc']['id']

        qrcode = pix.geraqrcode(loc_id)

        '''
        verificacao pix
        response = pix.verificapix(txid)
        '''

        return qrcode