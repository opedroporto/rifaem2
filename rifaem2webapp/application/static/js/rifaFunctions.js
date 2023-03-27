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
document.querySelectorAll(".lblSub").forEach((lblSub) => {
	lblSub.addEventListener("click", (lblSub) => {
		if (lblSub.classList.contains("on")) {
			modalfOpen();
		}
	});
})
function modalfOpen() {
	modalFinish.classList.add("on");
	document.getElementById("numerosRifa").value = numsRifa;
}

function modalCloseF() {
	modalFinish.classList.remove("on");
}
