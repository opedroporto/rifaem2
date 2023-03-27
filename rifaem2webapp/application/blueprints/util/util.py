import datetime

from dateutil import parser
from zoneinfo import ZoneInfo


def init_app(app):
    # extensões jinja
    app.jinja_env.add_extension('jinja2.ext.loopcontrols')

    # funções próprias
    app.jinja_env.globals.update(formata_data=formata_data)
    

def formata_data(data_str, hora=False):
    data = parser.parse(data_str)
    data = data.astimezone(ZoneInfo("America/Sao_Paulo"))

    if hora:
        nova_data = data.strftime("%d/%m/%Y (%H:%M:%S)")
        return nova_data

    nova_data = data.strftime("%d/%m/%Y")
    return nova_data
