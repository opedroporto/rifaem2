from flask_wtf.csrf import CSRFProtect

class Csrf():
    def init_app(self, app):
        self.csrf = CSRFProtect(app)
        self.csrf.init_app(app)
        
        return self.csrf