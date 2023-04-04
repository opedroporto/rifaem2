"""
    Definição das views
"""

from flask import request, render_template, abort, redirect, url_for

from ...ext.session import session
from ...ext.form.form import RequisitaCompraForm, EnviaMensagemForm
from ...ext.email.email import Email
from ...blueprints.pix.api import faz_pedido, carrega_rifas, lista_pedidos


def init_app(app):
    """
        Definição das views
    """
    email = Email()
    email.init_app(app)

    @app.route("/", methods=["GET"])
    def index():
        pagina = 0
        quantidade = 3

        rifas = carrega_rifas(pagina, quantidade)

        requisita_compra_form = RequisitaCompraForm()
        return render_template("index.html", rifas=rifas, form=requisita_compra_form)

    @app.route("/rifa", methods=["POST"])
    def rifa():
        dados = request.get_json()

        # confere request
        try:
            pagina = dados['pagina']
            quantidade = dados['quantidade']

            if pagina is None or not isinstance(pagina, int):
                abort(400, "Entrada(s) inválida(s)")
            if quantidade is None or not isinstance(quantidade, int):
                abort(400, "Entrada(s) inválida(s)")
        except NameError:
            abort(400, "Entrada(s) inválida(s)")
        except KeyError:
            abort(400, "Entrada(s) inválida(s)")

        rifas = carrega_rifas(pagina, quantidade)

        return render_template("paginaRifa.html", rifas=rifas)


    @app.route("/requisita-compra", methods=["POST"])
    def requisita_compra():
        dados = request.get_json()
        form = RequisitaCompraForm()

        # FORM VÁLIDO
        if form.validate():
            # tenta fazer pedido
            try:
                resposta = faz_pedido(dados)

                dados_pix = {
                    "qrcode": resposta['result']['qrcode'],
                    "copiaecola": resposta['result']['copiaecola'],
                }

                # SUCESSO
                session.addPedido(resposta['result']['txid'])
                email.envia_pedido_efetuado(dados['email'], dados)
                return dados_pix
            # erro
            except NameError:
                return abort(422, "Erro ao processar o pedido")
            except KeyError:
                return abort(422, "Erro ao processar o pedido")

        # FORM INVÁLIDO
        return abort(400, "Erro ao processar o pedido")


    @app.route("/pedidos", methods=["GET"])
    def pedidos():
        pedidos_txid = session.pedidos()

        if pedidos_txid:
            pedidos = lista_pedidos(pedidos_txid)
            return render_template("pedidos.html", pedidos=pedidos)

        return render_template("pedidos.html")

    @app.route("/sobre", methods=["GET"])
    def sobre():
        form = EnviaMensagemForm()
        return render_template("sobre.html", form=form)
        
    @app.route("/envia-mensagem", methods=["POST"])
    def envia_mensagem():
        dado = request.form.to_dict()
        form = EnviaMensagemForm()

        # FORM VÁLIDO
        if form.validate():
            try:
                email.envia_mensagem_do_usuario({
                    'email': dado['email'],
                    'nome': dado['nome'],
                    'telefone': dado['telefone'],
                    'mensagem': dado['mensagem']
                })

                # renderiza página sobre
                return redirect(url_for("sobre"))
            # erro
            except NameError:
                return abort(422, "Erro ao processar o pedido")
            except KeyError:
                return abort(422, "Erro ao processar o pedido")
        
        # FORM INVÁLIDO
        return abort(400, "Erro ao processar o pedido")

    @app.route("/gnevent/txid/<txid>", methods=["POST"])
    def recebe_txid(txid):
        print(f"pago:{txid}")
        return 200

    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html'), 404