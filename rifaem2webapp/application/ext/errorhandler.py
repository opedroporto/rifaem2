from flask import render_template

def init_app(app):
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html'), 404