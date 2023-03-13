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
        if not request.form.get('rifa'):
            abort(400, "Entrada(s) inválida(s)")
        if not request.form.get('numerosRifa'):
            abort(400, "Entrada(s) inválida(s)")
        if not request.form.get('nome'):
            abort(400, "Entrada(s) inválida(s)")
        if not request.form.get('telefone'):
            abort(400, "Entrada(s) inválida(s)")
        if not request.form.get('email'):
            abort(400, "Entrada(s) inválida(s)")

        dados = {}
        dados['rifa'] = request.form.get('rifa')
        dados['numerosRifa'] = []
        for numero in request.form.get('numerosRifa'):
            dados['numerosRifa'].append(numero)
        dados['nome'] = request.form.get('nome')
        dados['telefone'] = request.form.get('telefone')
        dados['email'] = request.form.get('email')

        resposta = pedido(dados)

        return resposta