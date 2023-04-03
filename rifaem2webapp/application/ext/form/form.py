"""
    Definição dos forms
"""

from flask_wtf import FlaskForm
from wtforms import StringField, TelField, EmailField, SubmitField
from wtforms.validators import DataRequired, Optional, Length, Email, Regexp
from wtforms.widgets import TextArea

class RequisitaCompraForm(FlaskForm):
    """
        Formulário de requisição de compra
    """
    # nome
    nome = StringField("Insira seu nome:", validators=[
        DataRequired(),
        Length(min=0, max=255)
    ])
    # telefone
    telefone = TelField("Insira seu telefone:", validators=[
        DataRequired(),
        Regexp(
            regex=r"^\([1-9]{2}\) (9[1-9])[0-9]{3}-[0-9]{4}$",
            message="Formato de telefone inválido"
        )
    ])
    # e-mail
    email = EmailField("Insira seu e-mail:", validators=[
        DataRequired(),
        Email(),
        Regexp(
            regex=r"[^@\s]+@[^@\s]+\.[^@\s]+",
            message="Formato de e-mail inválido"
        )
    ])

    # botão enviar
    btnEnviar = SubmitField("Finalizar")

class EnviaMensagemForm(FlaskForm):
    """
        Formulário de contato (envia mensagem do usuário)
    """
    # e-mail
    email = EmailField("Insira seu e-mail:", validators=[
        DataRequired(),
        Email(),
        Regexp(
            regex=r"[^@\s]+@[^@\s]+\.[^@\s]+",
            message="Formato de e-mail inválido"
        )
    ])
    # nome
    nome = StringField("Insira seu nome:", validators=[
        Optional(),
        Length(min=0, max=255)
    ])
    # telefone
    telefone = TelField("Insira seu telefone:", validators=[
        Optional(),
        Regexp(
            regex=r"^\([1-9]{2}\) (9[1-9])[0-9]{3}-[0-9]{4}$",
            message="Formato de telefone inválido"
        )
    ])

    # mensagem
    mensagem = StringField("Insira sua mensagem:", widget=TextArea(), validators=[
        DataRequired(),
    ])

    # botão enviar
    btnEnviar = SubmitField("Enviar mensagem")