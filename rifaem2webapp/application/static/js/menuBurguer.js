const btnBurguer = document.querySelector(".menu-burguer");
const menuAside = document.querySelector(".menu-aside");
const rifasLi = document.getElementById("rifasLink");

btnBurguer.addEventListener("click", function () {
    btnBurguer.classList.toggle("on");
    menuAside.classList.toggle("on");
	document.documentElement.classList.toggle("on");
});
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