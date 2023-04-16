const Gerencianet = require("gn-api-sdk-node");
const chavePix = process.env.GN_CHAVE_PIX

const options = {
	sandbox: false,
	client_id: process.env.GN_CLIENT_ID,
	client_secret: process.env.GN_CLIENT_SECRET,
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