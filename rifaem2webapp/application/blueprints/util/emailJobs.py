import os

from threading import Thread
from flask import render_template, copy_current_request_context
from flask_mail import Message

from ...ext.email import mail
from ...blueprints.pixapi.resources import nome_rifa

def async_envia_pedido_efetuado(destinatario, dados, txid):
    @copy_current_request_context
    def envia_pedido_efetuado(detinatario, dados, txid):
        dados['nomeRifa'] = nome_rifa(dados['rifa'])
    
        msg = Message('[Rifa EM2] Pedido Efetuado com Sucesso!',
            sender = os.getenv("EMAIL_USERNAME"),
            recipients = [destinatario]
        )
        
        msg.html = render_template("pedidoEfetuadoEmail.html", dados=dados, txid=txid)

        mail.send(msg)

    thr = Thread(target=envia_pedido_efetuado, args=[destinatario, dados, txid])
    thr.start()

def async_envia_pedido_confirmado(destinatario, dados, txid):
    @copy_current_request_context
    def envia_pedido_efetuado(detinatario, dados, txid):

        msg = Message('[Rifa EM2] Pagamento Confirmado!',
            sender = os.getenv("EMAIL_USERNAME"),
            recipients = [destinatario]
        )
        
        msg.html = render_template("pedidoConfirmadoEmail.html", dados=dados, txid=txid)

        mail.send(msg)

    thr = Thread(target=envia_pedido_efetuado, args=[destinatario, dados, txid])
    thr.start()

def async_envia_mensagem_do_usuario(dados):
    @copy_current_request_context
    def envia_mensagem_do_usuario(dados):
        recipients = os.getenv("EMAIL_RECIPIENTS").split(" ")
        msg = Message('[Rifa EM2] Mensagem de um usuário recebida!',
            sender = os.getenv("EMAIL_USERNAME"),
            recipients = recipients
        )

        # substitui \n por <br>
        dados['mensagem'] = dados['mensagem'].replace('\n', '<br>')

        msg.html = render_template("mensagemUsuarioEmail.html", dados=dados)

        mail.send(msg)

    thr = Thread(target=envia_mensagem_do_usuario, args=[dados])
    thr.start()