const modalConfirm = document.querySelector(".modalBg");
const modalFinish = document.querySelector(".modalBgF");
const modalbtnClose = document.getElementById("btnClose");
const lblConcluir = document.querySelector(".lblSub");
const btnReset = document.querySelector(".resetNums");

const numsRifa = [];
let numAtualEl;
let numAtual;
let rifaId;

function checkRifa() {
	if(numsRifa.length != 0){
		document.getElementById("btnConc").removeAttribute('disabled');
		lblConcluir.classList.add("on");
		btnReset.classList.add("on");
	}else{
		document.getElementById("btnConc").setAttribute('disabled', "true");
		lblConcluir.classList.remove("on");
		btnReset.classList.remove("on");
	}
}

function modalcOpen(numEl) {
	modalConfirm.classList.add("on");
	numAtualEl = numEl
	numAtual = numEl.value
}
function modalfOpen() {
	modalFinish.classList.add("on");
	document.getElementById("numerosRifa").value = numsRifa;
}

function confirm() {
	modalConfirm.classList.remove("on");
	numsRifa.push(parseInt(numAtual));

	rifaId = numAtualEl.parentElement.querySelector("#rifaId").dataset.id

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

function mostraDadosPix(data) {
	console.log(data.qrcode);
	console.log(data.copiaecola);
}

function requisitaCompraErro(error) {
	console.log("Erro ao tentar comprar");
	console.log(error);
}

document.querySelectorAll('.modalForm').forEach((form) => {
	form.addEventListener("submit", event => {
		event.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		data.numerosRifa = numsRifa;
		data.rifa = rifaId;

		fetch("/requisita-compra", {
			method: "POST",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
		.then(data => mostraDadosPix(data))
		.catch(error => requisitaCompraErro(error))
	})
})



