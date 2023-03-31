import os

from flask_mail import Mail, Message


def init_app(app):
    app.config['MAIL_SERVER']='smtp.zoho.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USERNAME")
    app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True

    mail = Mail(app)


def enviar():
    '''
    print("enviando e-mail...")
    msg = Message('Hello',
        sender = os.getenv("EMAIL_USERNAME"),
        recipients = ['portopdr@gmail.com']
    )
    msg.body = "This is the email body"
    mail.send(msg)
    print("enviado")
    '''
    pass