const modalConfirm = document.querySelector(".modalBg");
const modalFinish = document.querySelector(".modalBgF");
const modalPix = document.querySelector(".modalbgPix");
const btnReset = document.querySelector(".resetNums");
const showNumsEl = document.querySelector(".showNums");

const numsRifa = new Set();
let numAtualEl;
let numAtual;

let rifaEl;
let rifaId;

const maximoRifaSemDivExpandir = 100;

// ativa ou desativa botão concluir da rifa atual
function checkRifa() {
	// botão concluir da rifa atual
	btnConcluir = rifaEl.querySelector(".lblSub");

	// ativa botão concluir
	if (numsRifa.size != 0) {
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
	numsRifa.add(parseInt(numAtual));
	
	rifaEl = numAtualEl.closest(".rifa");
	rifaId = numAtualEl.closest(".rifa").dataset.id;
	
	checkRifa();
	desabilitaOutrasRifas();
	atualizaShowNums();

	numAtualEl.disabled = true;
	numAtualEl.classList.add("selecionado");
	numAtualEl.parentNode.querySelector(".tooltips").style.display = "none";
}

function atualizaShowNums() {

	showNumsEl.innerHTML = ""
	numsRifa.forEach(numAtual => {
		// atualiza showNums
		let divEl = document.createElement("div");
		divEl.classList.add("numDiv");
	
		let iEl = document.createElement("i");
		iEl.className = "iPreview";
		iEl.insertAdjacentText("beforeend", numAtual);
		divEl.appendChild(iEl);
	
		let btnEl = document.createElement("button");
		let iTimes = document.createElement("i");
		iTimes.className = "fa-regular fa-times-circle";
		btnEl.appendChild(iTimes);
		btnEl.setAttribute("onclick", "removeNum(" + numAtual + ")");
		btnEl.setAttribute("title", "Remover");
		divEl.appendChild(btnEl);
		
		showNumsEl.appendChild(divEl);
	});
	showNumsEl.classList.add("on");


	// reseta rifa se necessário
	if (showNumsEl.innerHTML == "") {
		resetaRifaAtual();
		showNumsEl.classList.remove("on");
	}
}

function removeNum(num) {
	// atualiza números na rifa
	rifaEl.querySelectorAll(".numero").forEach((numeroEl) => {
		if (numeroEl.classList.contains("selecionado") & numeroEl.value == num) {
			numeroEl.disabled = false;
			numeroEl.classList.remove("selecionado");
			numAtualEl.parentNode.querySelector(".tooltips").style.display = "inline-block";
		}
	});

	numsRifa.delete(num);
	atualizaShowNums();
}

// limpa números
function limpaNums() {
	// limpa números na rifa
	rifaEl.querySelectorAll(".numero").forEach((numeroEl) => {
		if (numeroEl.classList.contains("selecionado")) {
			numeroEl.disabled = false;
			numeroEl.classList.remove("selecionado");
			numAtualEl.parentNode.querySelector(".tooltips").style.display = "inline-block";
		}
	});

	resetaRifaAtual();
	showNumsEl.classList.remove("on");
}

// reseta rifa atual
function resetaRifaAtual() {
	numsRifa.clear();
	
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
		if (quantidadeNumeros <= maximoRifaSemDivExpandir) {
			rifaGrid.querySelector(".expandRifa").style.display = "none";
		}
	});
}

//hover nas imagens

function hover(){
	const rifasImgs = document.querySelectorAll(".imgDiv img");
    for(let i = 0; i < rifasImgs.length; i++){
        rifasImgs[i].addEventListener('mouseenter', e => rifasImgs[i].parentNode.classList.add("slided"));
        rifasImgs[i].addEventListener('mouseleave', e => rifasImgs[i].parentNode.classList.remove("slided"));
	};
};

hover();
//clicar fora dos modals e menu burguer para sair
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

clicaFora(modalConfirm);
clicaFora(modalFinish);
clicaFora(modalPix);

//redirecionar para link no index

const linkRifas = document.getElementById("btn__ir__rifas");
const linkSobre = document.getElementById("btn__ir__sobre");
const linkWpp = document.getElementById("btn__ir__wpp");

linkRifas.addEventListener("click", (e) => {
	window.location.href = "/#rifas";
});
linkSobre.addEventListener("click", (e) => {
	window.location.href = "/sobre";
});
linkWpp.addEventListener("click", (e) => {
	window.location.href = "http://api.whatsapp.com/send?1=pt_BR&phone=551597832738";
});