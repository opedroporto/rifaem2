const modalConfirm = document.querySelector(".modalBg");
const modalFinish = document.querySelector(".modalBgF");
const modalPix = document.querySelector(".modalbgPix");
const modalbtnClose = document.getElementById("btnClose");
//const lblConcluir = document.querySelector(".lblSub");
const btnReset = document.querySelector(".resetNums");

const numsRifa = [];
let numAtualEl;
let numAtual;
let rifaId;

let pagina = 1;
const quantidade = 3;
let fimCarregamentoRifas = false;

function checkRifa() {
	if (numsRifa.length != 0) {
		document.getElementById("btnConc").removeAttribute('disabled');
		document.querySelectorAll(".lblSub").forEach((lblConcluir) => {
			let concluirId = lblConcluir.parentElement.dataset.id;
			if (concluirId === rifaId) {
				lblConcluir.classList.add("on");
				btnReset.classList.add("on");
				return;
			}
		});
	} else {
		document.getElementById("btnConc").setAttribute('disabled', "true");
		document.querySelectorAll(".lblSub").forEach((lblConcluir) => {
			let concluirId = lblConcluir.parentElement.dataset.id;
			if (concluirId === rifaId) {
				lblConcluir.classList.remove("on");
				btnReset.classList.remove("on");
				return;
			}
		});
	}
}

function modalcOpen(numEl) {
	modalConfirm.classList.add("on");
	numAtualEl = numEl;
	numAtual = numEl.value;
}
function modalfOpen() {
	modalFinish.classList.add("on");
	document.getElementById("numerosRifa").value = numsRifa;
}

function confirm() {

	modalConfirm.classList.remove("on");
	numsRifa.push(parseInt(numAtual));

	rifaId = numAtualEl.parentElement.parentElement.dataset.id;

	checkRifa();
}

function modalClose() {
	modalConfirm.classList.remove("on");
	checkRifa()
}
function modalCloseF() {
	modalFinish.classList.remove("on");
}

function limpaNums() {
	numsRifa.length = 0;
	checkRifa();
}

function mostraPix() {
	modalPix.classList.add("on");
	modalFinish.classList.remove("on");
}
function modalCloseP() {
	modalPix.classList.remove("on");
}


function mostraDadosPix(data) {
	mostraPix();
	document.getElementById("imgPix").src = data.qrcode;
	document.getElementById("pixChave").innerHTML = data.copiaecola;
	console.log(data.qrcode);
	console.log(data.copiaecola);
}

function requisitaCompraErro(error) {
	console.log("Erro ao tentar comprar");
	console.log(error);
}

function carregaRifas() {
	if (!fimCarregamentoRifas) {
		inicioCarregamentoPaginaRifas();
		fetch("/rifa", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
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

			desabilitaNumeros()
		})
		.catch(error => console.log(error))
		fimCarregamentoPaginaRifas();
	}
}

window.onscroll = () => {
	if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
		carregaRifas();
	}
}

function inicioCarregamentoPaginaRifas() {

}

function fimCarregamentoPaginaRifas() {

}

function desabilitaNumeros() {
	document.querySelectorAll(".numero").forEach((numero) => {
		if (["alocado", "reservado"].includes(numero.dataset.state)) {
			numero.disabled = true;
		}
	})
}



document.addEventListener("DOMContentLoaded", () => {
	//carregaRifas();
	
	document.querySelectorAll(".modalForm").forEach((form) => {
		form.addEventListener("submit", event => {
			event.preventDefault();

			const formData = new FormData(form);
			const data = Object.fromEntries(formData);
			data.numerosRifa = numsRifa;
			data.rifa = rifaId;

			fetch("/requisita-compra", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			}).then(res => res.json())
			.then(data => mostraDadosPix(data))
			.catch(error => requisitaCompraErro(error))
		});
	});
});
