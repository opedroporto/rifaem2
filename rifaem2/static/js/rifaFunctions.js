const modalConfirm = document.querySelector(".modalBg");
const modalFinish = document.querySelector(".modalBgF");
const modalbtnClose = document.getElementById("btnClose");
const lblConcluir = document.querySelector(".lblSub");
const btnReset = document.querySelector(".resetNums");

var numrAtual = "";
const numsRifa = [];

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

function modalcOpen(v) {
	modalConfirm.classList.add("on");
	numrAtual = numrAtual + v.value;
}
function modalfOpen() {
	modalFinish.classList.add("on");
	let teste = document.getElementById("numRifaF").value;
	teste = numsRifa;
	console.log(teste)
}

function confirm() {
	modalConfirm.classList.remove("on");
	numsRifa.push({numrAtual});
	numrAtual = "";
	checkRifa();
}

function modalClose() {
	modalConfirm.classList.remove("on");
	numrAtual = "";
	checkRifa()
}
function modalCloseF() {
	modalFinish.classList.remove("on");
}

function limpaNums() {
	numsRifa.length = 0;
	checkRifa();
}