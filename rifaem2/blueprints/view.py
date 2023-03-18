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
            return render_template("rifa.html")

        if request.method == "POST":
            dados = request.get_json()

            try:
                if dados['pagina'] is None:
                    abort(400, "Entrada(s) inválida(s)")
                if dados['quantidade'] is None:
                    abort(400, "Entrada(s) inválida(s)")
            except:
                abort(400, "Entrada(s) inválida(s)")

            pagina = dados['pagina']
            quantidade = dados['quantidade']

            rifas = carregaRifas(pagina, quantidade)

            return render_template("paginaRifa.html", rifas=rifas)

    @app.route("/requisita-compra", methods=["POST"])
    def requisitaCompra():
        dados = request.get_json()

        try:
            if dados['rifa'] is None:
                abort(400, "Entrada(s) inválida(s)")
            if dados['numerosRifa'] is None:
                abort(400, "Entrada(s) inválida(s)")
            if dados['nome'] is None:
                abort(400, "Entrada(s) inválida(s)")
            if dados['telefone'] is None:
                abort(400, "Entrada(s) inválida(s)")
            if dados['email'] is None:
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