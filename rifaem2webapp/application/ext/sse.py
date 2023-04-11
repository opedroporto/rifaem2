from flask_sse import sse

def init_app(app):
    app.register_blueprint(sse, url_prefix="/stream")