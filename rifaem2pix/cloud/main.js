const { geraCobranca, geraQRcode, configWebhook } = require("./pix.js")

const Rifa = Parse.Object.extend("Rifa");
const Numero = Parse.Object.extend("Numero");
const Pedido = Parse.Object.extend("Pedido");
const GnEvent = Parse.Object.extend("GnEvent");


Parse.Cloud.define("lista-rifas", async (req) => {
	// verificacoes
	if (req.user == null) throw "Usuário não autenticado";
	if (req.user.id != "ongE3YwyDO") throw "Usuário não autenticado";
	if (req.params.pagina == null) throw "Página inválida";
	if (req.params.quantidade == null) throw "Quantidade inválida";

	// rifas
	const page = req.params.pagina;
	const query = new Parse.Query(Rifa);
	query.descending("createdAt");
	query.limit(req.params.quantidade);
	query.skip(page * req.params.quantidade);

	let rifas = await query.find({useMasterKey: true});
	rifas = rifas.map(r => r.toJSON())

	// numeros de cada rifa
	for (let i = 0; i < rifas.length; i++) {
		const query2 = new Parse.Query(Numero);

		const rifa = new Rifa();
		rifa.id = rifas[i].objectId;
		query2.equalTo("rifa", rifa);
		query2.addAscending("numeroRifa");
		query2.select("numeroRifa", "nome", "status");
		const numeros = await query2.find({useMasterKey: true});

		const numerosJSON = numeros.map((n) => {
			n = n.toJSON();
			return {
				"numeroRifa": n.numeroRifa,
				"nome": n.nome,
				"status": n.status
			}
		})

		rifas[i].numeros = numerosJSON;
	}

	return rifas.map(function(r) {
		return {
			"id": r.objectId,
			"nome": r.nome,
			"autor": r.autor,
			"dataLancamento": r.dataLancamento.iso,
			"dataEncerramento": r.dataEncerramento.iso,
			"precoNumero": r.precoNumero,
			"numeroMaximo": r.numeroMaximo,
			"numeros": r.numeros
		}
	});
});

/*
Parse.Cloud.define("rifa", async (req) => {
	// verificacoes
	if (req.user == null) throw "Usuário não autenticado";
	if (req.user.id != "ongE3YwyDO") throw "Usuário não autenticado";
	if (req.params.id == null) throw "Rifa inválida";

	// rifa
	const rifa = new Rifa();
	rifa.id = req.params.id;

	// numeros da rifa
	const query = new Parse.Query(Numero);
	query.equalTo("rifa", rifa);
	query.select("numeroRifa", "nome", "status");
	const numerosDados = await query.find({useMasterKey: true});

	return numerosDados.map(function(p) {
		p = p.toJSON();
		return {
			"numeroRifa": p.numeroRifa,
			"nome": p.nome,
			"status": p.status
		}
	});
});
*/

Parse.Cloud.define("pedido", async (req) => {
	// verificacoes
	if (req.user == null) throw "Usuário não autenticado";
	if (req.user.id != "ongE3YwyDO") throw "Usuário não autenticado";
	if (req.params.rifa == null) throw "Rifa inválida";
	if (req.params.numerosRifa == null) throw "Número(s) inválidos";
	if (req.params.nome == null) throw "Nome inválido";
	if (req.params.telefone == null) throw "Telefone inválido";
	if (req.params.email == null) throw "E-mail inválido";

	// verifica se os números estão disponíveis
	const rifa = new Rifa();
	rifa.id = req.params.rifa;

	const query = new Parse.Query(Numero);
	query.equalTo("rifa", rifa);
	const numerosDados = await query.find({useMasterKey: true});

	for (const numeroComprado of numerosDados) {
		for (const numeroRequisitado of req.params.numerosRifa) {
			if (numeroRequisitado == numeroComprado.toJSON().numeroRifa) throw "Número(s) inválido";
		}
	}
	
	// tempo de expiração da cobrança
	const tempoExpiracao = 600; // 10 min
	const dataExpiracao = new Date();
	dataExpiracao.setSeconds(dataExpiracao.getSeconds() + tempoExpiracao)

	// define preço da cobrança
	const query2 = new Parse.Query(Rifa);
	query.equalTo("objectId", req.params.rifa);
	const rifaDados = await query2.first({useMasterKey: true});
	const precoNumeroRifa = rifaDados.toJSON().precoNumero;

	const preco = req.params.numerosRifa.length * precoNumeroRifa;

	// gera cobrança e qrcode
	dadosCobranca = await geraCobranca(preco, tempoExpiracao);
	dadosQrCode = await geraQRcode(dadosCobranca.loc.id);

	// adiciona pedido (db)
	const pedido = new Pedido();
	pedido.set("rifa", rifa);
	pedido.set("numerosRifa", req.params.numerosRifa);
	pedido.set("nome", req.params.nome);
	pedido.set("telefone", req.params.telefone);
	pedido.set("email", req.params.email);

	pedido.set("txid", dadosCobranca.txid);
	pedido.set("dataExpiracao", dataExpiracao);
	pedido.set("qrcode", dadosQrCode.imagemQrcode);
	pedido.set("copiaecola", dadosQrCode.qrcode);
	pedido.set("dadosCobranca", dadosCobranca);
	pedido.set("dadosQrCode", dadosQrCode);
	pedido.set("status", "pendente");

	await pedido.save(null, {useMasterKey: true});

	// adiciona números reservados (db)
	for (const numeroRequisitado of req.params.numerosRifa) {
		const numero = new Numero();

		numero.set("rifa", rifa);
		numero.set("numeroRifa", numeroRequisitado);
		numero.set("nome", req.params.nome);
		numero.set("telefone", req.params.telefone);
		numero.set("email", req.params.email);
		numero.set("status", "reservado");
		numero.set("dataExpiracao", dataExpiracao);
		
		await numero.save(null, {useMasterKey: true});
	}

	// retorna
	return {
		txid: dadosCobranca.txid,
		dataExpiracao: dataExpiracao,
		qrcode: dadosQrCode.imagemQrcode,
		copiaecola: dadosQrCode.qrcode
	};
});

Parse.Cloud.define("webhook", async (req) => {
	if (req.user == null) throw "Usuário inválido";
	if (req.user.id != "xERDS5p2Jq") throw "Usuário inválido";
	return "Olá do webhook!";
});

// TOOD: authenticar
Parse.Cloud.define("pix", async (req) => {
	for (const e of req.params.pix) {
		
		// gera evento da Gerencianet (db)
		const gnEvent = new GnEvent();
		gnEvent.set("eid", e.endToEndId);
		gnEvent.set("txid", e.txid);
		gnEvent.set("event", e);

		await gnEvent.save(null, {useMasterKey: true});

		// muda status do pedido para pago (db)
		const query = new Parse.Query(Pedido);
		query.equalTo("txid", e.txid);
		
		const pedido = await query.first({useMasterKey: true})
		if (pedido == null) {
			throw "Pedido não encontrado";
		}

		pedido.set("status", "pago");
		pedido.set("eid", e.endToEndId);

		await pedido.save(null, {useMasterKey: true});

		// muda status do números da rifa (db)
		// reservado -> alocado
		const query2 = new Parse.Query(Pedido);
		query2.equalTo("txid", e.txid);
		const pedidoDadosResposta = await query2.first({useMasterKey: true});
		const pedidoDados = pedidoDadosResposta.toJSON();

		for (const numeroRifa of pedidoDados.numerosRifa) {
			// numero
			const rifa = new Rifa();
			rifa.id = pedidoDados.rifa.objectId;

			const query3 = new Parse.Query(Numero);
			query3.equalTo("rifa", rifa);
			query3.equalTo("numeroRifa", numeroRifa);

			const numero = await query3.first({useMasterKey: true});
			console.log(numero)
			// muda status (reservado -> alocado)
			numero.set("status", "alocado");
			
			await numero.save(null, {useMasterKey: true});
		}

	}

	return;
});

Parse.Cloud.define("lista-pedidos", async (req) => {
	if (req.user == null) throw "Usuário não autenticado";
	if (req.user.id != "ongE3YwyDO") throw "Usuário não autenticado";
	if (req.params.pedidosTxid == null) throw "pedidos inválidos";

	const pedidosTxid = req.params.pedidosTxid;

	// pedidos
	let pedidos = [];
	for (var i = 0; i < pedidosTxid.length; i++) {
		let txid = pedidosTxid[i];
		
		const query = new Parse.Query(Pedido);
		query.equalTo("txid", txid);
		//query.ascending("createdAt");
		//query.select("numeroRifa", "nome", "status");
		const pedido = await query.find({useMasterKey: true});

		const pedidoJSON = pedido.map((p) => {
			p = p.toJSON();
			return {
				"txid": p.txid,
				"dataPedido": p.createdAt,
				"qrcode": p.qrcode,
				"copiaecola": p.copiaecola,
				"status": p.status
			}
		});
		
		pedidos.push(pedidoJSON[0])
	}


	return pedidos;
});

/*
Parse.Cloud.define("config-webhook", async (req) => {
	configWebhook(req.params.url)
});
*/

/*
Parse.Cloud.define("sign-up", async (req) => {
	if (req.params.email == null) throw "Email inválido" 
	if (req.params.password == null) throw "Senha inválida" 
	if (req.params.name == null) throw "Nome inválido" 


	const user = new Parse.User();
	user.set("username", req.params.email);
	user.set("email", req.params.email);
	user.set("password", req.params.password);
	user.set("name", req.params.name);

	const usuarioSalvo = await user.signUp(null, {useMasterKey: true});
	return usuarioSalvo.get("sessionToken");
});
*/

/*
Parse.Cloud.define("login", async (req) => {
	const user = await Parse.User.logIn(req.params.email, req.params.password);
	return user;
});
*/


/** curl -X POST \
* -H "X-Parse-Application-Id: IvARJbWMwQsJdQQtnhw5f0aBpsFogUxBmnQQB5Lr" \
* -H "X-Parse-REST-API-Key: vI5o5rwDgF8oqJB4kzs2KgfUNFY7rReOFXyp8nUq" \
* -H "Content-Type: application/json" \
* -d "{}" \
* https://parseapi.back4app.com/functions/hello
*/

// If you have set a function in another cloud code file, called "test.js" (for example)
// you need to refer it in your main.js, as you can see below:

/* require("./test.js"); */
