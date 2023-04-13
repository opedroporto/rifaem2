var pagina = 1;
const quantidade = 3;
var fimCarregamentoRifas = false;
var carregandoRifas = false;

function mostraPagamentoConfirmado() {
	alert("Pagamento Confirmado!");
}

function mostraPix(data) {

	modalPix.classList.add("on");
	modalFinish.classList.remove("on");

	document.getElementById("imgPix").src = data.qrcode;
	document.getElementById("pixChave").innerHTML = data.copiaecola;

	// SSE
	var source = new EventSource("/stream");
	source.addEventListener("message", function(event) {
		let txidRecebido = event.data;
		let txidAtual = data.txid;

		if (txidRecebido == txidAtual) {
			mostraPagamentoConfirmado();
			source.close();
		}
	}, false);
}

function modalCloseP() {
	modalPix.classList.remove("on");
}

function mostraDadosPix(data) {
	mostraPix(data);
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
			checaTamanho();
			desabilitaNumeros();
			desabilitaOutrasRifas();
			alteraBtns();
			
		})
		//.catch(error => console.log(error))
	}
}

window.onscroll = () => {
	if (Math.round(window.innerHeight + window.scrollY) === document.body.offsetHeight) {
		carregaRifas();
	}
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

	document.querySelectorAll(".modalForm").forEach((form) => {
		form.addEventListener("submit", event => {
			event.preventDefault();
			
			const formData = new FormData(form);
			const data = Object.fromEntries(formData);
			data.numerosRifa = numsRifa;
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
			.then(data => mostraDadosPix(data))
			.catch(error => requisitaCompraErro(error))
		});
	});
});
