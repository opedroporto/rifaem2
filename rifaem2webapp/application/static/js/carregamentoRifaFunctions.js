var pagina = 1;
var quantidade = 3;

var fimCarregamentoRifas = false;
var carregandoRifas = false;

var sseTimeout = 660000

function mostraPagamentoConfirmado() {
	modalConfirmBody = document.querySelector(".modalBodyP");
	modalConfirmContent = document.querySelector(".modalContentPix");
	modalFooterA = document.querySelector(".modalBodyP .footer a");
	
	console.log(document.querySelector(".payed .modalHead h2"));
	modalConfirmBody.classList.add("payed");
	document.querySelector(".payed .modalHead h2").innerHTML = "Pagamento Confirmado!";
	modalFooterA.innerHTML = "Fechar";
	modalFooterA.setAttribute("href", "/");
}

function mostraPix(data) {

	modalPix.classList.add("on");
	modalFinish.classList.remove("on");

	document.getElementById("imgPix").src = data.qrcode;
	document.getElementById("pixChave").innerHTML = data.copiaecola;

	// SSE
	var source = new EventSource("/stream");

	// SSE: close connection
	var sseCloseTimeout = setTimeout(function() {
		source.close();
	}, sseTimeout);

	// SSE: listen for message
	source.addEventListener("message", function(event) {
		let txidRecebido = event.data;
		let txidAtual = data.txid;

		if (txidRecebido == txidAtual) {
			mostraPagamentoConfirmado();
			source.close();
			clearTimeout(sseCloseTimeout);
		}
	}, false);
}

function modalCloseP() {
	modalPix.classList.remove("on");
}

function mostraDadosPix(data) {
	mostraPix(data);
	limpaNums();
}

function requisitaCompraErro(error) {
	console.log("Erro ao tentar comprar");
	console.log(error);
}

function carregaRifas() {
	if (!fimCarregamentoRifas && !carregandoRifas) {
		inicioCarregamentoPaginaRifas();
		fetch("/rifa", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'X-CSRFToken': csrf_token
			},
			body: JSON.stringify({
				"pagina": pagina,
				"quantidade": quantidade
			})
		})
		.then(res => res.text())
		.then((data) => {
			if (data.length == 0) {
				fimCarregamentoRifas = true;
			}
			pagina += 1;
			const rifa = document.createElement("div");
			rifa.innerHTML = data;
			document.querySelector(".principal").insertAdjacentHTML("beforeend", data);

			fimCarregamentoPaginaRifas();
			checaDivExpandir();
			checaTamanho();
			desabilitaNumeros();
			desabilitaOutrasRifas();
			alteraBtns();
			hover();
			imgClick();
			
		})
		//.catch(error => console.log(error))
	}
}

window.onscroll = () => {
	// carregamento dinâmico
	if (Math.round(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
		carregaRifas();
	}

	// desexpandir rifas automaticamente
	document.querySelectorAll(".rifaGrid").forEach((rifaGrid) => {
		// rifas expandidas
		if (rifaGrid.classList.contains("expandido")) {
			let rifaGridRect = rifaGrid.getBoundingClientRect()
			// rifa acima
			if (rifaGridRect.bottom <= 0) {
				rifaGrid.classList.remove("expandido");
			}
			// rifa abaixo
			if (rifaGridRect.top >= (window.innerHeight || document.documentElement.clientHeight)) {
				rifaGrid.classList.remove("expandido");
			}
		}
	})
}

function inicioCarregamentoPaginaRifas() {
	carregandoRifas = true;
	let animacaoCarregamentoEl = document.querySelector(".animacaoCarregamento")
	animacaoCarregamentoEl.style.display = "flex";
}

function fimCarregamentoPaginaRifas() {
	carregandoRifas = false;
	let animacaoCarregamentoEl = document.querySelector(".animacaoCarregamento")
	animacaoCarregamentoEl.style.display = "none";
}

function desabilitaNumeros() {
	document.querySelectorAll(".numero").forEach((numero) => {
		if (["alocado", "reservado"].includes(numero.dataset.state)) {
			numero.disabled = true;
		}
	})
}

document.addEventListener("DOMContentLoaded", () => {
	checaTamanho();
	alteraBtns();
	checaDivExpandir();
	hover();
	imgClick();

	document.querySelectorAll(".modalForm").forEach((form) => {
		form.addEventListener("submit", event => {
			event.preventDefault();
			
			// desabilita botão
			const btnEnviar = form.querySelector("#btnEnviar")
			btnEnviar.disabled = true;
			btnEnviar.value = "Processando...";

			const formData = new FormData(form);
			const data = Object.fromEntries(formData);
			data.numerosRifa = Array.from(numsRifa);
			data.rifa = rifaId;
			//let nomeRifa = rifaEl.querySelector(".nomeRifa").innerHTML;
			//data.nomeRifa = nomeRifa;

			fetch("/requisita-compra", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'X-CSRFToken': csrf_token
				},
				body: JSON.stringify(data)
			}).then(res => res.json())
			.then(data => {
				mostraDadosPix(data);
				btnEnviar.disabled = false;
				btnEnviar.value = "Finalizar";
			})
			.catch(error => {
				requisitaCompraErro(error);
				btnEnviar.disabled = false;
				btnEnviar.value = "Finalizar";
			})
		});
	});
});
