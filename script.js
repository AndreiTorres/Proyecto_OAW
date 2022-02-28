const modal = document.getElementById("exampleModal");
const nombreSitio = document.getElementById("titulo");
const btnGuardarUrl = document.getElementById("guardar_url");
const lista_url = document.getElementsByClassName("div_lista");
const lista_noticias = document.getElementById('lista_noticias');

btnGuardarUrl.addEventListener("click", mostrarUrl);

window.onload = mostrar;

function mostrar() {
  let content = makeRequest("mostrarUrl.php", "");
  if (content) {

  } else {
    console.log("No hay nada!");
  }
}


function mostrarUrl() {
  let url = document.getElementById("url_modal").value;
  let content = makeRequest("agregarUrl.php?q=", url);
  console.log(content);
  /*if (validURL(url)) {
    makeRequest(url);
  } else {
    alert("Url invalida");
  }*/
}

function makeRequest(nombrearchivo, url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("1");
      return this.responseText;
      /*let rss = JSON.parse(this.responseText);
      nombreSitio.innerHTML = rss.sitio;
      lista_url[0].innerHTML = rss.enlace;
      lista_noticias.innerHTML = rss.noticias;*/
    }
  };
  xmlhttp.open("GET", nombrearchivo + url, true);
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