import datetime

from dateutil import parser
from backports.zoneinfo import ZoneInfo


def init_app(app):
    # extensões jinja
    app.jinja_env.add_extension('jinja2.ext.loopcontrols')

    # funções próprias
    app.jinja_env.globals.update(formata_data=formata_data)
    app.jinja_env.globals.update(pedido_esta_pendente=pedido_esta_pendente)
    app.jinja_env.globals.update(data_encerrada=data_encerrada)
    

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

def data_encerrada(data_encerramento):
    data_encerramento = converte_string_para_data(data_encerramento)
    data_encerramento = converte_fuso_horario_br(data_encerramento)

    data_agora = datetime.datetime.now()
    data_agora = converte_fuso_horario_br(data_agora)

    print(data_encerramento, data_agora)
    if data_agora > data_encerramento:
        return True

    return False

def pedido_esta_pendente(data_pedido):
    data_pedido = converte_string_para_data(data_pedido)
    data_pedido = converte_fuso_horario_br(data_pedido)

    data_agora = datetime.datetime.now()
    data_agora = converte_fuso_horario_br(data_agora)

    if data_agora < data_pedido + datetime.timedelta(minutes = 10):
        return True

    return False