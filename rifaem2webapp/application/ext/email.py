from flask_mail import Mail, Message

mail = Mail()

def init_app(app):
    mail.init_app(app)