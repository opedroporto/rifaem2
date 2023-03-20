const btnBurguer = document.querySelector(".menu-burguer")
const menuAside = document.querySelector(".menu-aside")

btnBurguer.addEventListener("click", function () {
    btnBurguer.classList.toggle("on");
    menuAside.classList.toggle("on");
	document.documentElement.classList.toggle("on");
})

window.addEventListener("resize", (e) => {
    if (window.innerWidth > 860){ 
        btnBurguer.classList.remove("on");
        menuAside.classList.remove("on");
		document.documentElement.classList.remove("on");
    };
});