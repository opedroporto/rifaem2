from flask import request, render_template, abort

from ...ext.session import session
from ..pix.api import pedido, carrega_rifas, lista_pedidos

def init_app(app):
    """ define as views """
    @app.route("/", methods=["GET"])
    def index():
        pagina = 0
        quantidade = 3

        rifas = carrega_rifas(pagina, quantidade)

        return render_template("index.html", rifas=rifas)

    @app.route("/rifa", methods=["GET", "POST"])
    def rifa():
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

            rifas = carrega_rifas(pagina, quantidade)

            return render_template("paginaRifa.html", rifas=rifas)

    @app.route("/requisita-compra", methods=["POST"])
    def requisita_compra():
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
            dados_pix = {
                "qrcode": resposta['result']['qrcode'],
                "copiaecola": resposta['result']['copiaecola'],
            }

            session.addPedido(resposta['result']['txid'])

            return dados_pix
        except:
            abort(400, "Erro ao fazer processar pedido")

    @app.route("/pedidos", methods=["GET"])
    def pedidos():
        pedidos_txid = session.pedidos()

        if pedidos_txid:
            pedidos = lista_pedidos(pedidos_txid)
            return render_template("pedidos.html", pedidos=pedidos)

        return render_template("pedidos.html")