const btnBurguer = document.querySelector(".menu-burguer");
const menuAside = document.querySelector(".menu-aside");
const rifasLi = document.getElementById("rifasLink");
const header = document.querySelector("header");
const BgmenuAside = document.querySelector(".bgMenu-aside");

btnBurguer.addEventListener("click", function () {
    const aberto = btnBurguer.getAttribute('aria-expanded') === "true";
	if(aberto ? menuClose() : menuOpen());
});

function menuOpen() {
	btnBurguer.setAttribute("aria-expanded", "true");
	menuAside.setAttribute("data-state", "opened");
	BgmenuAside.setAttribute("data-state", "opened");
	btnBurguer.classList.add("on");
	menuAside.classList.add("on");
};
function menuClose() {
	btnBurguer.setAttribute("aria-expanded", "false");
	menuAside.setAttribute("data-state", "closing");
	BgmenuAside.setAttribute("data-state", "closing");
	btnBurguer.classList.remove("on");
	menuAside.classList.remove("on");
	menuAside.addEventListener("animationend", () => {
		menuAside.setAttribute("data-state", "closed");
		BgmenuAside.setAttribute("data-state", "closed");
	}, {once: true});
};

rifasLi.addEventListener("click", function () {
	btnBurguer.classList.remove("on");
    menuAside.classList.remove("on");
	btnBurguer.setAttribute("aria-expanded", "false");
	menuAside.setAttribute("data-state", "closing");
	BgmenuAside.setAttribute("data-state", "closing");
	menuAside.addEventListener("animationend", () => {
		menuAside.setAttribute("data-state", "closed");
		BgmenuAside.setAttribute("data-state", "closed");
	}, {once: true});
});

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

clicaFora(BgmenuAside);

window.addEventListener("resize", (e) => {
    if (window.innerWidth > 860 && btnBurguer.getAttribute('aria-expanded') === "true"){ 
        btnBurguer.classList.remove("on");
        menuAside.classList.remove("on");
		btnBurguer.setAttribute("aria-expanded", "false");
		menuAside.setAttribute("data-state", "closing");
		BgmenuAside.setAttribute("data-state", "closing");
		menuAside.addEventListener("animationend", () => {
			menuAside.setAttribute("data-state", "closed");
			BgmenuAside.setAttribute("data-state", "closed");
		}, {once: true});
    };
});

try{
	var offsets = document.getElementById('rifas').getBoundingClientRect();
	var offsetTop = offsets.top;
	if(offsetTop < 500){
		offsetTop = offsetTop + 700;
	}

	window.addEventListener("scroll", function () {
		if (window.innerWidth > 440){
			header.classList.toggle("sticky", window.scrollY > offsetTop - 119);
			//console.log(offsetTop);
		}else {
			header.classList.toggle("sticky", window.scrollY > offsetTop - 76);
			//console.log(offsetTop);
		}
	});
}catch{};

