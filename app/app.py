from flask import Flask, request, render_template

from src.pix import PixModel

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/pix", methods=["GET"])
def pix():
    #payload = request.json
    payload = {
        "txid": "ASFDUIda272b717atsdba2122IUA27S1",
        "calendario": {
            "expiracao": 60
        },
        "devedor": {
            "cpf": "cpf",
            "nome": "nome"
        },
        "valor": {
            "original": "valor"
        },
        "chave": "e5ab195e-c2a5-42db-9ce1-3841e6e22615",
        "solicitacaoPagador": "Informe o número ou identificador do pedido."
    }
    txid = payload.pop("txid")

    pix_model = PixModel()
    #return pix_model.create_order(txid, payload)
    #return pix_model.create_order("ASHDUIda272b718aasdoa2122IUA27S1", payload)
    response = pix_model.create_charge(txid, payload)

    return response


if __name__ == "__main__":
    app.run()