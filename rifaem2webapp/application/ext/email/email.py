import os

from threading import Thread
from flask import render_template
from flask_mail import Mail, Message

from ...blueprints.pix.api import nome_rifa

class Email:

    def init_app(self, app):
        app.config['MAIL_SERVER']='smtp.gmail.com'
        app.config['MAIL_PORT'] = 587
        app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USERNAME")
        app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")
        app.config['MAIL_USE_TLS'] = True

        self.app = app
        self.mail = Mail(app)

    def thread_envia_pedido_efetuado(self, destinatario, dados):
        with self.app.app_context():
            dados['nomeRifa'] = nome_rifa(dados['rifa'])

            msg = Message('[Rifado2] Pedido Efetuado com Sucesso!',
                sender = os.getenv("EMAIL_USERNAME"),
                recipients = [destinatario]
            )

            msg.html = render_template("pedidoEfetuadoEmail.html", dados=dados)

            self.mail.send(msg)

    def envia_pedido_efetuado(self, destinatario, dados):
        thr = Thread(target=self.thread_envia_pedido_efetuado, args=[destinatario, dados])
        thr.start()

    def thread_envia_mensagem_do_usuario(self, dados):
        recipients = os.getenv("EMAIL_RECIPIENTS").split(" ")
        with self.app.app_context():
            msg = Message('[Rifado2] Mensagem de um usuário recebida!',
                sender = os.getenv("EMAIL_USERNAME"),
                recipients = recipients
            )

            # substitui \n por <br>
            dados['mensagem'] = dados['mensagem'].replace('\n', '<br>')

            msg.html = render_template("mensagemUsuarioEmail.html", dados=dados)

            self.mail.send(msg)

    def envia_mensagem_do_usuario(self, dados):
        thr = Thread(target=self.thread_envia_mensagem_do_usuario, args=[dados])
        thr.start()