const modalConfirm = document.querySelector(".modalBg");
const modalFinish = document.querySelector(".modalBgF");
const modalPix = document.querySelector(".modalbgPix");
const btnReset = document.querySelector(".resetNums");
const showNumsEl = document.querySelector(".showNums");

const numsRifa = [];
let numAtualEl;
let numAtual;

let rifaEl;
let rifaId;

const maximoRifaSemDivExpandir = 150;

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

	rifaEl = numAtualEl.closest(".rifa");
	rifaId = numAtualEl.closest(".rifa").dataset.id;

	let iEl = document.createElement("i");
	iEl.insertAdjacentText("beforeend", numAtual);
	showNumsEl.appendChild(iEl);
	showNumsEl.classList.add("on");

	checkRifa();

	desabilitaOutrasRifas();
}

// limpa números
function limpaNums() {
	resetaRifaAtual();
	showNumsEl.classList.remove("on");
	while (showNumsEl.lastElementChild) {
		showNumsEl.removeChild(showNumsEl.lastElementChild);
	}
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

function checaTamanho() {
	const rifaGrid = document.querySelectorAll(".rifaGrid");

	for(let i=0; i < rifaGrid.length; i++){
		const slidesNum = rifaGrid[i].querySelectorAll(".slides").length;
		
		if(slidesNum == 1){
			rifaGrid[i].style.overflowX = "hidden";
		}
	}
}

function expandir(ex) {	
	elPai = ex.parentNode.parentNode;
	if(elPai.classList.contains("expandido")){
		elPai.classList.remove("expandido");
	}else{
		elPai.classList.add("expandido");
	}	
}

function slideDescription(sl){
	paizao = sl.parentNode;
	if(paizao.classList.contains("slided")){
		paizao.classList.remove("slided");
	}else{
		paizao.classList.add("slided");
	}
}

//adicionar ícones para o botão concluir e limpar números	
window.addEventListener("resize", (e) => {
	alteraBtns();
});

function alteraBtns() {
	const btnConc = document.querySelectorAll(".lblSub");
	let elementI = document.createElement("i");
	if (window.innerWidth < 1033){
		elementI.className = "fa-regular fa-times-circle";	
		btnReset.innerHTML = "";
		btnReset.appendChild(elementI);
		for(i=0;i < btnConc.length;i++){
			let elementIConc = document.createElement("i");
			elementIConc.className = "fa-regular fa-check-circle";	
			btnConc[i].innerHTML = "";
			btnConc[i].appendChild(elementIConc);
		}
	} else {
		btnReset.innerHTML = "Limpar Números";
		for(i=0; i < btnConc.length; i++) {
			btnConc[i].innerHTML = "Concluir";
			while (btnConc[i].lastElementChild) {
				btnConc[i].removeChild(btnConc[i].lastElementChild);
			}
		}
	}
}

function checaDivExpandir() {
	document.querySelectorAll(".rifaGrid").forEach((rifaGrid) => {
		quantidadeNumeros = rifaGrid.querySelectorAll(".tooltip").length;
		if (quantidadeNumeros < maximoRifaSemDivExpandir) {
			rifaGrid.querySelector(".expandRifa").style.display = "none";
		}
	});
}

function hover(){
	const rifasImgs = document.querySelectorAll(".imgDiv img");
    for(let i = 0; i < rifasImgs.length; i++){
        rifasImgs[i].addEventListener('mouseenter', e => rifasImgs[i].parentNode.classList.add("slided"));
        rifasImgs[i].addEventListener('mouseleave', e => rifasImgs[i].parentNode.classList.remove("slided"));
	};
};

function checkClick(click){
	if(click.target !== this) return;
	
	this.classList.remove("on");
	if(this.getAttribute("data-state")){
		menuClose();
	};
	if(this.className === "modalbgPix"){
		window.location.reload();
	}
};

function clicaFora(item) {
	item.addEventListener("click", checkClick);		
};

const menuAsideBg = document.querySelector(".bgMenu-aside");
clicaFora(modalConfirm);
clicaFora(modalFinish);
clicaFora(modalPix);
clicaFora(menuAsideBg);