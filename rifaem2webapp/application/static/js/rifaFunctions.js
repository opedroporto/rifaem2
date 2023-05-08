const modalConfirm = document.querySelector(".modalBg");
const modalFinish = document.querySelector(".modalBgF");
const modalPix = document.querySelector(".modalbgPix");
const btnReset = document.querySelector(".resetNums");
const showNumsEl = document.querySelector(".showNums");
const modalImg = document.querySelector(".modal__img__bg");

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
	modalConfirm.setAttribute("data-anim", "opened");
	numAtualEl = numEl;
	numAtual = numEl.value;
}

function modalClose() {
	modalConfirm.setAttribute("data-anim", "closing"); 
	modalConfirm.addEventListener("animationend", (e) => {
		modalConfirm.setAttribute("data-anim", "closed"); 
		modalConfirm.classList.remove("on");
	}, {once: true});
	checkRifa()
}

// modal Final
function modalfOpen(btnConcluirAtual) {
	if (btnConcluirAtual.classList.contains("on")) {
		modalFinish.classList.add("on");
		modalFinish.setAttribute("data-anim", "opened");
		document.getElementById("numerosRifa").value = numsRifa;
	}
}

function modalCloseF() {
	modalFinish.setAttribute("data-anim", "closing"); 
	modalFinish.addEventListener("animationend", (e) => {
		modalFinish.setAttribute("data-anim", "closed"); 
		modalFinish.classList.remove("on");
	}, {once: true});
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

const debounce = (func, wait, immediate) => {
    var timeout;
    return () => {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function hover(){
	const rifasImgs = document.querySelectorAll(".imgDiv img");
	const rifasDesc = document.querySelectorAll(".imgDiv .descInfo");
	const docFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
	
    for(let i = 0; i < rifasImgs.length; i++){
		if (!(rifasImgs[i].closest(".rifa").classList.contains("rifaDesabilitada"))) {
			rifasImgs[i].addEventListener('mouseenter', e => rifasImgs[i].parentNode.classList.add("slided"));
			rifasImgs[i].addEventListener('mouseleave', e => rifasImgs[i].parentNode.classList.remove("slided"));
			numConvert = rifasImgs[i].offsetWidth / docFontSize;
			rifasDesc[i].style.width = numConvert + "rem";
		}
	};
};

function imgClick() {
	const rifasImgs = document.querySelectorAll(".imgDiv img");
	let modalImgDesc = document.querySelector(".modalHead.Desc h2");
	let hiddenInputDesc = document.querySelectorAll(".inputDescH");

	for(let nI = 0; nI < rifasImgs.length; nI++){
        rifasImgs[nI].addEventListener('click', function() {
			if (!rifasImgs[nI].closest(".rifa").classList.contains("rifaDesabilitada")) {
				modalImg.classList.add("on");
				modalImg.setAttribute("data-anim", "opened");
				document.querySelector(".modalContentImg img").src = rifasImgs[nI].src;
				modalImgDesc.innerHTML = hiddenInputDesc[nI].value;
			}
		});
	};
}

window.addEventListener("resize", debounce(() => hover(),
200, false), false);

//mobile
window.addEventListener('orientationchange', () => hover(), false);


//clicar fora dos modals e menu burguer para sair
function checkClick(click){
	if(click.target !== this) return;
	
	if(this.getAttribute("data-state")){
		menuClose();
	}
	if(this.getAttribute("data-anim")){
		this.setAttribute("data-anim", "closing");
		this.addEventListener("animationend", (e) => {
			this.setAttribute("data-anim", "closed"); 
			this.classList.remove("on");
			if(this.className === "modalbgPix"){
				window.location.reload();
			}
		}, {once: true});
	}
};

function clicaFora(item) {
	item.addEventListener("click", checkClick);		
};

clicaFora(modalConfirm);
clicaFora(modalFinish);
clicaFora(modalPix);
clicaFora(modalImg);

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
	window.location.href = "http://api.whatsapp.com/send?1=pt_BR&phone=5515998521081";
});

function checkEncerrada () {
	document.querySelectorAll(".rifa").forEach((rifaEl) => {
		if (rifaEl.classList.contains("rifaDesabilitada")) {
			//rifaEl.querySelector("h1").style.textDecoration = "line-through";
			rifaEl.querySelector("h2").style.textDecoration = "line-through";
			rifaEl.querySelector("h4").style.textDecoration = "line-through";

			rifaEl.childNodes.forEach(el => {
				try {
					el.style.filter = "grayscale(1)";
				} catch (e) {

				}
			})
				
		}
	})
}