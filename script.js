const modal = document.getElementById("exampleModal");
const nombreSitio = document.getElementById("titulo");
const btnGuardarUrl = document.getElementById("guardar_url");
const lista_url = document.getElementsByClassName("div_lista");
const lista_noticias = document.getElementById('lista_noticias');
const btnEnlace = document.getElementsByClassName("btnEnlace");
const btnActualizar = document.getElementById("btn-actualizar");
const btnBuscar = document.getElementById("btnBuscador");
const campoBuscar = document.getElementById("campo_buscar");
const lista_categorias = document.getElementById("div_categorias");
const btnCategorias = document.getElementById("btnCategorias");
const btnCerrar = document.getElementById("btnCerrar");

var noticiaActualSeleccionada;
let global = "";

btnGuardarUrl.addEventListener("click", agregarUrl);
btnActualizar.addEventListener("click",actualizarPage);
btnBuscar.addEventListener("click",asignarEventoBuscar);
btnCategorias.addEventListener("click",mostrarCategorias);
btnCerrar.addEventListener("click",ocultarbtnCerrar);
window.onload = mostrar;

function mostrar() {
  makeRequest("mostrarUrl.php?q=mostrar");
  let content = global;
  if (content) {
   
    content = JSON.parse(global);
    lista_url[0].innerHTML = content.enlace;
    asignarEventoBoton();
    agregarEventoBorrar();
    mostrarNoticiasPrimero();
  }
}

function mostrarNoticiasPrimero(){
  if(btnEnlace.length != 0){
    makeRequest("mostrarNoticias.php?q=" + btnEnlace[0].textContent);
    let content = JSON.parse(global);
    nombreSitio.innerHTML = btnEnlace[0].textContent;
    lista_noticias.innerHTML = content.noticias;
    noticiaActualSeleccionada =  btnEnlace[0].textContent;
  }else{
    lista_noticias.innerHTML = "<h1>No hay noticias<h1>";
  }
}

function actualizarPage(){  
  makeRequest("actualizar.php?q=" + nombreSitio.textContent);
  console.log(global);
  makeRequest("mostrarNoticias.php?q=" + nombreSitio.textContent);
  let content = JSON.parse(global);
  lista_noticias.innerHTML = content.noticias;
  noticiaActualSeleccionada =  nombreSitio.textContent;
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
    nombreSitio.innerHTML = "Resultados de Busqueda";
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

function mostrarCategorias(){
  mostrarbtnCerrar()
  makeRequest("mostrarCategoria.php?q=categorias");
  let content = JSON.parse(global);
  lista_categorias.innerHTML = content.categories;
  
}
function mostrarbtnCerrar(){
  document.getElementById('sec_categorias').style.display = 'block';
  document.getElementById('btnCerrar').style.display = 'block';
  
}
function ocultarbtnCerrar(){
  document.getElementById('sec_categorias').style.display = 'none';
  document.getElementById('btnCerrar').style.display = 'none';
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Falta obtener el valor del boton categoria para que muestre las noticias por categoria
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function cargarNoticiasPorCategoria(){ 
  const valor ="";
  makeRequest("mostrarCategoria.php?q="+valor);

  let content = global;
  if (content) {   
    content = JSON.parse(global);
    lista_noticias.innerHTML= content.noticias;    
  } else {
    console.log("No hay nada!");
  }
}

