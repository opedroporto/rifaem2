const modalConfirm = document.querySelector(".modalBg");
const modalFinish = document.querySelector(".modalBgF");
const modalPix = document.querySelector(".modalbgPix");
//const modalbtnClose = document.getElementById("btnClose");
const btnReset = document.querySelector(".resetNums");

const numsRifa = [];
let numAtualEl;
let numAtual;

let rifaEl;
let rifaId;

// ativa ou desativa botão concluir da rifa atual
function checkRifa() {
	// botão concluir da rifa atual
	btnConcluir = rifaEl.querySelector(".lblSub");

	// ativa botão concluir
	if (numsRifa.length != 0) {
		btnConcluir.classList.add("on");
		btnReset.classList.add("on");
	}

	// desativa botão
	else {
		btnConcluir.classList.remove("on");
		btnReset.classList.remove("on");
	}
}

// confirma número escolhido
function confirm() {
	modalConfirm.classList.remove("on");
	numsRifa.push(parseInt(numAtual));

	rifaEl = numAtualEl.closest('.rifa');
	rifaId = numAtualEl.closest('.rifa').dataset.id;

	checkRifa();

	desabilitaOutrasRifas();
}

// limpa números
function limpaNums() {
	resetaRifaAtual();
}

// reseta rifa atual
function resetaRifaAtual() {
	numsRifa.length = 0;
	
	checkRifa();

	numAtualEl = undefined;
	numAtual = undefined;
	
	rifaEl = undefined;
	rifaId = undefined;
	
	habilitaTodasRifas();
}

// desabilita rifas não escolhidas
function desabilitaOutrasRifas() {
	// se há rifa selecionada
	if (rifaId) {
		// cada rifa
		document.querySelectorAll(".rifa").forEach((rifa) => {
			// se for outra rifa
			if (rifa.dataset.id !== rifaId) {
				// cada número
				rifa.querySelectorAll(".numero").forEach((numero) => {
					numero.disabled = true;
				})
			}
		})
	}
}

// habilita todas rifas
function habilitaTodasRifas() {
	// cada rifa
    document.querySelectorAll(".rifa").forEach((rifa) => {
		// cada número
		rifa.querySelectorAll(".numero").forEach((numero) => {
			numero.disabled = false;
		})
    })
}

// modal Confirm
function modalcOpen(numEl) {
	modalConfirm.classList.add("on");
	numAtualEl = numEl;
	numAtual = numEl.value;
}

function modalClose() {
	modalConfirm.classList.remove("on");
	checkRifa()
}

// modal Final
function modalfOpen(btnConcluirAtual) {
	if (btnConcluirAtual.classList.contains("on")) {
		modalFinish.classList.add("on");
		document.getElementById("numerosRifa").value = numsRifa;
	}
}

function modalCloseF() {
	modalFinish.classList.remove("on");
}

/*
const digitaTelefone = (event) => {
	let input = event.target
	input.value = mascaraTelefone(input.value)
  }
  
const mascaraTelefone = (value) => {
	if (!value) return ""
	value = value.replace(/\D/g,'')
	value = value.replace(/(\d{2})(\d)/,"($1) $2")
	value = value.replace(/(\d)(\d{4})$/,"$1-$2")
	return value
}
*/

// máscara telefone

$(":input").inputmask();

$("#telefone").inputmask({"mask": "(99) 99999-9999", "Regex": "^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$"});