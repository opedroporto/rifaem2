import base64
import requests
import json
import pyqrcode
from PIL import Image
from io import BytesIO
from flask import send_file, request

from rifaem2.credentials import credentials


class ModeloPix():

    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {self.get_token()}",
            "Content-Type": "application/json"
        }

    def get_token(self, ):
        certificado = credentials.CREDENTIALS['certificate']

        auth = base64.b64encode(
            (f"{credentials.CREDENTIALS['client_id']}:{credentials.CREDENTIALS['client_secret']}"
            ).encode()).decode()

        url = "https://api-pix.gerencianet.com.br/oauth/token"

        payload="{\r\n    \"grant_type\": \"client_credentials\"\r\n}"
        headers = {
            'Authorization': f"Basic {auth}",
            'Content-Type': 'application/json'
        }

        response = requests.request("POST",
                                    url,
                                    headers=headers,
                                    data=payload,
                                    cert=certificado)

        return json.loads(response.content)['access_token']

    def create_qrcode(self, location_id):
        response = requests.get(f"{credentials.URL_PROD}/v2/loc/{location_id}/qrcode", headers=self.headers, cert=credentials.CREDENTIALS['certificate'])
        
        print(response.content)
        return json.loads(response.content)

    def create_order(self, txid, payload):
        response = requests.put(f"{credentials.URL_PROD}/v2/cob/{txid}", data=json.dumps(payload), headers=self.headers, cert=credentials.CREDENTIALS['certificate'])

        if response.status_code == 201:
            return json.loads(response.content)
        
        return {}

    def qrcode_generator(self, location_id):
        '''
        qrcode = self.create_qrcode(location_id)

        data_qrcode = qrcode['qrcode']

        url = pyqrcode.QRCode(data_qrcode, error='H')
        url.png('qrcode.jpg', scale='10')
        im = Image.open("qrcode.jpg")
        im = im.convert("RGBA")
        img_io = BytesIO()
        im.save(img_io, "PNG", quality='00')
        img_io.seek(0)

        return send_file(img_io, mimetype="image/jpeg", as_attachment=False, download_name="image-qrcode.jpg")
        '''
        qrcode = self.create_qrcode(location_id)

        return qrcode['imagemQrcode']

    def create_charge(self, txid, payload):
        location_id = self.create_order(txid, payload).get("loc").get("id")
        qrcode = self.qrcode_generator(location_id)

        return qrcode