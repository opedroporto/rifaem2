const status = document.querySelectorAll(".status");
const outerPart = document.querySelectorAll(".outerPart");
const spanCopy = document.querySelectorAll(".copiar");
const copyIcon = document.querySelectorAll(".fa-solid.fa-copy");

window.addEventListener("scroll", function () {
    if (window.innerWidth > 440){
        header.classList.toggle("sticky", window.scrollY > 118);
    }else {
        header.classList.toggle("sticky", window.scrollY > 75);
    }
});

for(let i=0; i<spanCopy.length; i++){

    if(status[i].textContent === " não pago  "){
        outerPart[i].setAttribute("data-status", "NP");
    }
    if(status[i].textContent === " PENDENTE  "){
        outerPart[i].setAttribute("data-status", "P");
    }

    spanCopy[i].addEventListener("mouseover", function(e) {
        if(outerPart[i].getAttribute("data-status") === "NP"){
            copyIcon[i].style.color = "#a13a3a";
        }
        else if(outerPart[i].getAttribute("data-status") === "P"){
            copyIcon[i].style.color = "#dfbb3b";
        }
        else{
            copyIcon[i].style.color = "#3aa15a";
        }
    });
    spanCopy[i].addEventListener("mouseleave", function(e) {
        if(outerPart[i].getAttribute("data-status") === "NP"){
            copyIcon[i].style.color = "";
        }
        else if(outerPart[i].getAttribute("data-status") === "P"){
            copyIcon[i].style.color = "";
        }
        else{
            copyIcon[i].style.color = "";
        }
    });
    
}
function copy(that){
    var inp =document.createElement('input');
    document.body.appendChild(inp);
    inp.value = that.textContent;
    inp.select();
    document.execCommand('copy',false);
    inp.remove();
    
    copyIcon[that.getAttribute("data-position") - 1].innerHTML = " Copiado!";
    copyIcon[that.getAttribute("data-position") - 1].style.right = "-2%";
    setTimeout(function(){
        copyIcon[that.getAttribute("data-position") - 1].innerHTML = " Copiar";
        copyIcon[that.getAttribute("data-position") - 1].style.right = "0";
    }, 2000);
        
};

// filtros

document.querySelector("#btnAtualizar").onclick = () => {
    location.reload();
}

document.querySelector(".btnFiltro.todos").onclick = () => {
    document.querySelectorAll(".outerPart").forEach((pedidoEl) => {
        pedidoEl.style.display = "block";
        pedidoEl.nextElementSibling.style.display = "block";
    })
    limpaHrFinal()
}

document.querySelector(".btnFiltro.pendentes").onclick = () => {
    document.querySelectorAll(".outerPart").forEach((pedidoEl) => {
        let status = pedidoEl.querySelector(".status").innerHTML.trim().toUpperCase()
        if (status != "PENDENTE") {
            pedidoEl.style.display = "none";
            pedidoEl.nextElementSibling.style.display = "none";
        } else {
            pedidoEl.style.display = "block";
            pedidoEl.nextElementSibling.style.display = "block";
        }
    })
    limpaHrFinal()
}

document.querySelector(".btnFiltro.pagos").onclick = () => {
    document.querySelectorAll(".outerPart").forEach((pedidoEl) => {
        let status = pedidoEl.querySelector(".status").innerHTML.trim().toUpperCase()
        if (status != "PAGO") {
            pedidoEl.style.display = "none";
            pedidoEl.nextElementSibling.style.display = "none";
        } else {
            pedidoEl.style.display = "block";
            pedidoEl.nextElementSibling.style.display = "block";
        }
    })
    limpaHrFinal()
}

document.querySelector(".btnFiltro.naoPagos").onclick = () => {
    document.querySelectorAll(".outerPart").forEach((pedidoEl) => {
        let status = pedidoEl.querySelector(".status").innerHTML.trim().toUpperCase()
        if (status != "NÃO PAGO") {
            pedidoEl.style.display = "none";
            pedidoEl.nextElementSibling.style.display = "none";
        } else {
            pedidoEl.style.display = "block";
            pedidoEl.nextElementSibling.style.display = "block";
        }
    })
    limpaHrFinal()
}

function limpaHrFinal() {
    document.querySelectorAll(".outerHr").forEach((hrEl) => {
        console.log(hrEl.nextElementSibling);
        let nextEl = hrEl.nextElementSibling
        if (nextEl === null) {
            hrEl.style.display = "none";
        } else if ((nextEl.classList.contains("outerPart")) & nextEl.style.getPropertyValue("display") == "none") {
            hrEl.style.display = "none";
        }
    })
}