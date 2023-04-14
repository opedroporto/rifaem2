const btnBurguer = document.querySelector(".menu-burguer");
const menuAside = document.querySelector(".menu-aside");
const rifasLi = document.getElementById("rifasLink");

btnBurguer.addEventListener("click", function () {
    const aberto = btnBurguer.getAttribute('aria-expanded') === "true";
	if(aberto ? menuClose() : menuOpen());
});

function menuOpen() {
	btnBurguer.setAttribute("aria-expanded", "true");
	menuAside.setAttribute("data-state", "opened");
	btnBurguer.classList.add("on");
	menuAside.classList.add("on");
	document.documentElement.classList.add("on");
};
function menuClose() {
	btnBurguer.setAttribute("aria-expanded", "false");
	menuAside.setAttribute("data-state", "closing");
	btnBurguer.classList.remove("on");
	menuAside.classList.remove("on");
	document.documentElement.classList.remove("on");
	menuAside.addEventListener("animationend", () => {
		menuAside.setAttribute("data-state", "closed");
	}, {once: true});
};

rifasLi.addEventListener("click", function () {
		btnBurguer.classList.remove("on");
        menuAside.classList.remove("on");
		document.documentElement.classList.remove("on");
});

window.addEventListener("resize", (e) => {
    if (window.innerWidth > 860){ 
        btnBurguer.classList.remove("on");
        menuAside.classList.remove("on");
		document.documentElement.classList.remove("on");
    };
});