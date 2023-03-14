from flask import request, render_template, abort
from rifaem2.credentials import credentials

from .pix.api import pedido, carregaRifas, carregaRifa



def init_app(app):
    @app.route("/", methods=["GET"])
    def index():
        return render_template("index.html")

    @app.route("/rifa", methods=["GET", "POST"])
    def rifa():
        if request.method == "GET":
            pagina = request.args.get("pagina") or 0
            rifas = carregaRifas(pagina)
            return render_template("rifa.html", rifas=rifas['result'])

        '''
        if request.method == "POST":
            if not request.form.get('id'):
                abort(400, "Entrada(s) inválida(s)")

            rifaId = request.form.get('id')

            return carregaRifa(rifaId)
        '''

    @app.route("/requisita-compra", methods=["POST"])
    def requisitaCompra():
        print(request.get_json()) #debug
        
        dados = request.get_json()
        dados['rifa'] = "III9UlG4Cc"

        try:
            if not dados['rifa']:
                abort(400, "Entrada(s) inválida(s)")
            if not dados['numerosRifa']:
                abort(400, "Entrada(s) inválida(s)")
            if not dados['nome']:
                abort(400, "Entrada(s) inválida(s)")
            if not dados['telefone']:
                abort(400, "Entrada(s) inválida(s)")
            if not dados['email']:
                abort(400, "Entrada(s) inválida(s)")
        except:
            abort(400, "Entrada(s) inválida(s)")

        resposta = pedido(dados)
        if 'code' in resposta and resposta['code'] != 200:
            abort(400, "Erro ao fazer processar pedido")
        
        try:
            dadosPix = {
                "qrcode": resposta['result']['qrcode'],
                "copiaecola": resposta['result']['copiaecola'],
            }
            return dadosPix
        except:
            abort(400, "Erro ao fazer processar pedido")