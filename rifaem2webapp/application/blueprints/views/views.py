"""
    Definição das views
"""
import os

from flask import Blueprint, request, render_template, abort, redirect, url_for, Response
from flask_sse import sse

from ...ext.csrf import csrf
from ...blueprints.util.emailJobs import async_envia_pedido_efetuado, async_envia_pedido_confirmado, async_envia_mensagem_do_usuario
from ...blueprints.util.sessionJobs import addPedido, getPedidos
from ...blueprints.pixapi.resources import faz_pedido, carrega_rifas, lista_pedidos, get_dados_comprador
from .forms import RequisitaCompraForm, EnviaMensagemForm

bp = Blueprint("views_blueprint", __name__)


def init_app(app):
    
    @bp.route("/", methods=["GET"])
    def index():
        rifas = carrega_rifas(pagina=0, quantidade=3)
        requisita_compra_form = RequisitaCompraForm()

        return render_template("index.html", rifas=rifas, form=requisita_compra_form)

    @bp.route("/rifa", methods=["POST"])
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


    @bp.route("/requisita-compra", methods=["POST"])
    def requisita_compra():
        dados = request.get_json()
        form = RequisitaCompraForm()

        # FORM VÁLIDO
        if form.validate():
            try:
                resposta = faz_pedido(dados)

                dados_pix = {
                    "qrcode": resposta['result']['qrcode'],
                    "copiaecola": resposta['result']['copiaecola'],
                    "txid": resposta['result']['txid'],
                }

                # SUCESSO
                addPedido(resposta['result']['txid'])
                async_envia_pedido_efetuado(dados['email'], dados, resposta['result']['txid'])
                return dados_pix
    
            # erro
            except NameError:
                return abort(422, "Erro ao processar o pedido")
            except KeyError:
                return abort(422, "Erro ao processar o pedido")

        # FORM INVÁLIDO
        return abort(400, "Erro ao processar o pedido")


    @bp.route("/pedidos", methods=["GET"])
    def pedidos():
        pedidos_txid = getPedidos()

        if pedidos_txid:
            pedidos = lista_pedidos(pedidos_txid)
            return render_template("pedidos.html", pedidos=pedidos)

        return render_template("pedidos.html")

    @bp.route("/sobre", methods=["GET"])
    def sobre():
        form = EnviaMensagemForm()
        return render_template("sobre.html", form=form)
        
    @bp.route("/envia-mensagem", methods=["POST"])
    def envia_mensagem():
        dado = request.form.to_dict()
        form = EnviaMensagemForm()

        # FORM VÁLIDO
        if form.validate():
            try:
                async_envia_mensagem_do_usuario({
                    'email': dado['email'],
                    'nome': dado['nome'],
                    'telefone': dado['telefone'],
                    'mensagem': dado['mensagem']
                })

                # renderiza página sobre
                return redirect(url_for("views_blueprint.sobre"))
            # erro
            except NameError:
                return abort(422, "Erro ao processar o pedido")
            except KeyError:
                return abort(422, "Erro ao processar o pedido")
        
        # FORM INVÁLIDO
        return abort(400, "Erro ao processar o pedido")

    @bp.route("/gnevent/txid/<txid>", methods=["POST"])
    @csrf.exempt
    def recebe_txid(txid):
        # autentica
        if 'Parse-Auth-Token' in request.headers:
            token = request.headers['Parse-Auth-Token']
            if token != os.getenv("PARSE_AUTH_TOKEN"):
                abort(400, "Usuário inválido")
        else:
            abort(400, "Usuário inválido")

        # envia e-mail
        dados = get_dados_comprador(txid)
        async_envia_pedido_confirmado(dados['email'], dados, txid)

        # Atualiza tela (envia evento com SSE)
        sse.publish(txid, type="message")

        return "", 200

    app.register_blueprint(bp)