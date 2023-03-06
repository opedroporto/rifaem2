from rifaem2.blueprints import view

from flask import Flask

app = Flask(__name__)

view.init_app(app)

if __name__ == "__main__":
    app.run()