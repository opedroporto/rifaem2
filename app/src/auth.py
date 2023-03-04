import requests
import base64
import json

from src.credentials.credentials import CREDENTIALS

def get_token():

    credentials = {
        "client_id": CREDENTIALS['client_id'],
        "client_secret": CREDENTIALS['client_secret'],
    }

    certificado = "./src/credentials/" + CREDENTIALS['certificate']

    auth = base64.b64encode(
        (f"{CREDENTIALS['client_id']}:{CREDENTIALS['client_secret']}"
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

if __name__ == "__main__":
    main()