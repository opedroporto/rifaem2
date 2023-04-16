import time

from flask_sse import sse
from threading import Thread

def init_app(app):
    app.register_blueprint(sse, url_prefix="/stream")
    async_mantem_sse_ativo(app)

def async_mantem_sse_ativo(app):
    def mantem_sse_ativo(app):
        with app.app_context():
            while True:
                sse.publish(-1, type="message")
                time.sleep(10)
    thr = Thread(target=mantem_sse_ativo, args=[app])
    thr.start()