import base64
import requests
import json
import pyqrcode

from PIL import Image
from io import BytesIO
from flask import send_file, request
from gerencianet import Gerencianet

from rifaem2.credentials import credentials

gn = Gerencianet(credentials.CREDENTIALS)

class ModeloPix():

    def gerapix(self, dados):

        params = {
            'txid': dados['txid']
        }

        body = {
            'calendario': {
                'expiracao': 300
            },
            'valor': {
                'original': dados['preco']
            },
            'chave': 'e5ab195e-c2a5-42db-9ce1-3841e6e22615',
            'solicitacaoPagador': 'Cobrança dos serviços prestados.'
        }

        response = gn.pix_create_charge(params=params,body=body)
        
        return response

    def geraqrcode(self, loc_id):

        params = {
            'id': loc_id
        }

        response = gn.pix_generate_QRCode(params=params)
        base64 = response['imagemQrcode']

        return base64

    def verificapix(self, txid):

        '''
        params = {
            'e2eId': ''
        }

        response =  gn.pix_detail(params=params)
        '''