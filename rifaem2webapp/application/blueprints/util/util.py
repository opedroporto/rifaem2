import datetime

from dateutil import parser
from zoneinfo import ZoneInfo


def init_app(app):
    # extensões jinja
    app.jinja_env.add_extension('jinja2.ext.loopcontrols')

    # funções próprias
    app.jinja_env.globals.update(formata_data=formata_data)
    app.jinja_env.globals.update(pedido_esta_pendente=pedido_esta_pendente)
    

def formata_data(data_str, hora=False):
    data = converte_string_para_data(data_str)
    data = converte_fuso_horario_br(data)

    if hora:
        nova_data = data.strftime("%d/%m/%Y (%H:%M:%S)")
        return nova_data

    nova_data = data.strftime("%d/%m/%Y")
    return nova_data

def converte_string_para_data(data_str):
    return parser.parse(data_str)

def converte_fuso_horario_br(data):
    return data.astimezone(ZoneInfo("America/Sao_Paulo"))

def pedido_esta_pendente(dataPedido):
    dataPedido = converte_string_para_data(dataPedido)
    dataPedido = converte_fuso_horario_br(dataPedido)

    dataAgora = datetime.datetime.now()
    dataAgora = converte_fuso_horario_br(dataAgora)

    if dataAgora < dataPedido + datetime.timedelta(minutes = 10):
        return True

    return False