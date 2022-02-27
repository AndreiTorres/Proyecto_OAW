const modal = document.getElementById("exampleModal");
const nombreSitio = document.getElementById("titulo");
const btnGuardarUrl = document.getElementById("guardar_url");
const lista_url = document.getElementsByClassName("div_lista");
const lista_noticias = document.getElementById('lista_noticias');

btnGuardarUrl.addEventListener("click", mostrarUrl);

function mostrarUrl() {
  let url = document.getElementById("url_modal").value;
  makeRequest(url);

  /*if (validURL(url)) {
    makeRequest(url);
  } else {
    alert("Url invalida");
  }*/
}

function makeRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let rss = JSON.parse(this.responseText);
      nombreSitio.innerHTML = rss.sitio;
      lista_url[0].innerHTML = rss.enlace;
      lista_noticias.innerHTML = rss.noticias;
    }
  };
  xmlhttp.open("GET", "procesar.php?q=" + url, true);
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