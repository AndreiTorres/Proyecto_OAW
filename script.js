const modal = document.getElementById("exampleModal");
const nombreSitio = document.getElementById("titulo");
const btnGuardarUrl = document.getElementById("guardar_url");
const lista_url = document.getElementsByClassName("div_lista");
const lista_noticias = document.getElementById('lista_noticias');
const btnEnlace = document.getElementsByClassName("btnEnlace");
const btnActualizar = document.getElementById("btn-actualizar");
const btnBuscar = document.getElementById("btnBuscador");
const campoBuscar = document.getElementById("campo_buscar");
var noticiaActualSeleccionada;
let global = "";

btnGuardarUrl.addEventListener("click", agregarUrl);
btnActualizar.addEventListener("click",actualizarPage);
btnBuscar.addEventListener("click",asignarEventoBuscar);
window.onload = mostrar;

function mostrar() {
  makeRequest("mostrarUrl.php?q=mostrar");
  let content = global;
  if (content) {
   
    content = JSON.parse(global);
    lista_url[0].innerHTML = content.enlace;
    asignarEventoBoton();
    agregarEventoBorrar();
  } else {
    console.log("No hay nada!");
  }
  
}

function actualizarPage(){  
  //Falta Definir
  location.reload(); 
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
    noticiaActualSeleccionada =  this.textContent;
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

function agregarEventoBorrar(){  
  const btnEliminar = document.getElementsByClassName("btnEliminar");
  for(let i=0; i<btnEliminar.length; i++){
    btnEliminar[i].addEventListener("click", borrar);
  }
}

function borrar(){
  let nombreEnlace = this.parentNode.childNodes;
  makeRequest("delete.php?q=" + nombreEnlace[1].textContent);
  if((typeof noticiaActualSeleccionada !== 'undefined') && (noticiaActualSeleccionada == nombreEnlace[1].textContent)){
    nombreSitio.innerHTML = "";
    lista_noticias.innerHTML = "";
  }
  mostrar();
}
function asignarEventoBuscar(){
  let palabras = document.getElementById("campo_buscar").value;
  makeRequest("buscador.php?q=" + palabras);
  let content = global;
  if (content) {   
    content = JSON.parse(global);
    lista_noticias.innerHTML= content.noticias;    
  } else {
    console.log("No hay nada!");
  }
  
}
function ordenar(){
  let select = document.getElementById("selectOrden");
  let metodoOrdenamiento = select.value;
  makeRequest("ordenamiento.php?q=" + nombreSitio.textContent + "&p=" + metodoOrdenamiento);
  let content = JSON.parse(global);
  lista_noticias.innerHTML = content.noticias;
}
/*
$(document).ready(function(){
  $(campoBuscar).focus()
  $(campoBuscar).on('keyup', function(){    
    var search = $(campoBuscar).val()
    $.ajax({
      type: 'POST',
      url: 'buscador.php',
      data: {'search': search},
     
    })
   
     .done(function(resultado){
       let content = JSON.parse(global);
      console.log(resultado);
      console.log("SEPARCION EL SIG ES CONTENT");
      console.log(content);
      lista_noticias.innerHTML = content.noticias;
    
      $('#lista_noticias').html(resultado)
    })
    .fail(function(){
      alert('Hubo un error :(')
    })

  })
})
*/

