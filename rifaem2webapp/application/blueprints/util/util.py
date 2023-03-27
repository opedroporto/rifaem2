import datetime

from dateutil import parser

def init_app(app):
    # extensões jinja
    app.jinja_env.add_extension('jinja2.ext.loopcontrols')

    # funções próprias
    app.jinja_env.globals.update(formata_data=formata_data)
    

def formata_data(data, hora=False):
    if hora:
        nova_data = parser.parse(data).strftime("%d/%m/%Y (%H:%M:%S)")
        return nova_data

    nova_data = parser.parse(data).strftime("%d/%m/%Y")
    return nova_data