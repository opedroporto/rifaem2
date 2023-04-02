import os

from flask_mail import Mail, Message

class Email:

    def init_app(self, app):
        '''
        app.config['MAIL_SERVER']='smtp.zoho.com'
        app.config['MAIL_PORT'] = 465
        app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USERNAME")
        app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")
        app.config['MAIL_USE_TLS'] = False
        app.config['MAIL_USE_SSL'] = True

        mail = Mail(app)
        '''
        app.config['MAIL_SERVER']='smtp.gmail.com'
        app.config['MAIL_PORT'] = 587
        app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USERNAME")
        app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")
        app.config['MAIL_USE_TLS'] = True
        #app.config['MAIL_USE_SSL'] = True

        self.app = app
        self.mail = Mail(app)

    def enviar(self, destinatario, dados):
        with self.app.app_context():
            print("enviando e-mail...")
            msg = Message('Hello',
                sender = os.getenv("EMAIL_USERNAME"),
                recipients = [destinatario]
            )
            msg.body = "Olá,\n" + str(dados)
            self.mail.send(msg)
            print("enviado")