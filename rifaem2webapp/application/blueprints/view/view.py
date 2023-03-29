import re

from flask import request, render_template, abort
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from ...ext.session import session
from ...blueprints.pix.api import pedido, carrega_rifas, lista_pedidos

class RequisitaCompraForm(FlaskForm):
    nome = StringField('Insira seu nome:', validators=[DataRequired()])
    telefone = StringField('Insira seu telefone:', validators=[DataRequired()])
    email = StringField('Insira seu e-mail:', validators=[DataRequired()])

def valida_dados_requisita_compra(dados):
    try:
        if dados['rifa'] is None:
            return false
        if dados['numerosRifa'] is None:
            return false
        if dados['nome'] is None:
            return false
        if dados['telefone'] is None:
            return false
        if dados['email'] is None:
            return false
    except:
        return false

    if not (0 < len(dados['rifa']) < 801):
        return False

    if not re.fullmatch(r'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$', dados['email']):
        return False
    if not (0 < len(dados['nome']) < 256):
        return False
    if not re.fullmatch(r'^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$', dados['telefone']):
        return False

    for num in dados['numerosRifa']:
        if not isinstance(num, int):
            return False

    return True

def init_app(app):
    """ define as views """
    @app.route("/", methods=["GET"])
    def index():
        pagina = 0
        quantidade = 3

        rifas = carrega_rifas(pagina, quantidade)

        form = RequisitaCompraForm();
        return render_template("index.html", rifas=rifas, form=form)

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

        if not valida_dados_requisita_compra(dados):
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