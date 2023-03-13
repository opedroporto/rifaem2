const Gerencianet = require("gn-api-sdk-node");
const chavePix = "e5ab195e-c2a5-42db-9ce1-3841e6e22615"

const options = {
	sandbox: false,
	client_id: "Client_Id_68d8fd7059501f0f1be3d9c29d7385c06dfd2ff1",
	client_secret: "Client_Secret_04e9c4a13d63ebbceb3640d3062506495de00fa7",
	pix_cert: __dirname + "/producao-443302-rifaem2.p12",
	validateMtls: true
}

const gerencianet = new Gerencianet(options);

async function geraCobranca(preco, tempoExpiracao) {
    let body = {
		calendario: {
			expiracao: tempoExpiracao,
		},
		valor: {
			original: preco.toFixed(2),
		},
		chave: chavePix
	}

	const response = await gerencianet.pixCreateImmediateCharge([], body);
    return response;
}

async function geraQRcode(locId) {

    let params = {
        id: locId,
    }

	const response = await gerencianet.pixGenerateQRCode(params);
    return response;
}

async function configWebhook(url) {
	let body = {
		webhookUrl: url,
	}

	let params = {
		chave: chavePix,
	}

	const response = await gerencianet.pixConfigWebhook(params, body);
	return response;
}

module.exports = { geraCobranca, geraQRcode, configWebhook };