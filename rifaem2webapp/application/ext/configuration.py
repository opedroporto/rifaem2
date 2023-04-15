import os

def init_app(app):
    # Flask
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    # Flask-WTF
    app.config['WTF_CSRF_SECRET_KEY'] = os.getenv("WTF_CSRF_SECRET_KEY")
    app.config['WTF_CSRF_TIME_LIMIT'] = None

    # Flask Mail
    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USERNAME")
    app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")
    app.config['MAIL_USE_TLS'] = True

    # Redis
    app.config["REDIS_URL"] = os.getenv("REDIS_URL")

    # MongoDB
    app.config["SESSION_TYPE"] = "mongodb"
    app.config["SESSION_MONGODB_DB"] = os.getenv("MONGODB_DATABASE")
    app.config["SESSION_MONGODB_COLLECT"] = os.getenv("MONGODB_COLLECTION")