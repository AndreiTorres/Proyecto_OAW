const modal = document.getElementById("exampleModal");
const nombreSitio = document.getElementById("titulo");
const btnGuardarUrl = document.getElementById("guardar_url");
const lista_url = document.getElementsByClassName("div_lista");
const lista_noticias = document.getElementById('lista_noticias');
const btnEnlace = document.getElementsByClassName("btnEnlace");
const btnActualizar = document.getElementById("btn-actualizar");
let global = "";

btnGuardarUrl.addEventListener("click", agregarUrl);
btnActualizar.addEventListener("click",actualizarPage);
window.onload = mostrar;

function mostrar() {
  makeRequest("mostrarUrl.php?q=mostrar");
  let content = global;
  if (content) {
    content = JSON.parse(global);
    lista_url[0].innerHTML = content.enlace;
    asignarEventoBoton();
  } else {
    console.log("No hay nada!");
  }
}

function actualizarPage(){  
 //por definir location.reload();
 
}

function asignarEventoBoton() {
    for (let i = 0; i < btnEnlace.length; i++) {
      btnEnlace[i].addEventListener("click", mostrarNoticias);
    }
}


// La idea es obtener una vez, guardar en arreglo para no tener que volver a llamar
function mostrarNoticias() {
  // this.textContent te muestra el valor del h5
    makeRequest("mostrarNoticias.php?q=" + this.textContent);
    let content = JSON.parse(global);
    nombreSitio.innerHTML = this.textContent;
    lista_noticias.innerHTML = content.noticias;
}


function agregarUrl() {
  let url = document.getElementById("url_modal").value;
  makeRequest("agregarUrl.php?q=" + url);
  mostrar();
}


function makeRequest(nombrearchivo) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      global = this.responseText;
    }
  };
  xmlhttp.open("GET", nombrearchivo, false);
  xmlhttp.send();
}

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
      "((\\d{1,3}\\.){3}\\d{1,3}))" + 
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
      "(\\?[;&a-z\\d%_.~+=-]*)?" + 
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}


/*
function borrar(event){
  let nombreEnlace =  event.target.parentNode.firsstChild.firstChild.value;

}*/