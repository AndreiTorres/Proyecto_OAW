<?php
require("db.php");

$metodo = $_GET['p'];
$nombreSitio = $_GET['q'];

// Obtener el id del sitio 
$sql = "SELECT * FROM urls WHERE nombre= '".$nombreSitio."'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$id_url = $row['id'];

switch ($metodo) {
  case 'fecha':
      $sql = "SELECT * FROM noticias WHERE id_url= '".$id_url."'";
      break;
  case 'titulo':
      $sql = "SELECT * FROM noticias WHERE id_url= '".$id_url."' ORDER BY titulo";
      break;
  case 'url':
      $sql = "SELECT * FROM noticias WHERE id_url= '".$id_url."' ORDER BY link";
      break;
  case 'descripcion':
      $sql = "SELECT * FROM noticias WHERE id_url= '".$id_url."' ORDER BY descripcion";
      break;
}

// Obtener las noticias con el id
$result = mysqli_query($conn, $sql);  
$noticias = "";
while ($row = $result->fetch_array()) {
    $noticias .= mostrar($row['titulo'], $row['link'], $row["descripcion"], $row['fecha']);
  }


  function mostrar($titulo, $link, $descripcion, $fecha) { 
    $noticias = <<<_END
    <article class="tarjeta">
    <div class="image">
      <img src="https://unsplash.it/100/100?image=503" alt="" />
    </div>
    <div class="informacion">
      <h3>
        $titulo
      </h3>
      Publicado el
      <time datetime="2012-10-15T12:00"
        >$fecha</time
      >
      <p>
        $descripcion
      </p>
      <button id="btnVisitar"><a href=$link>Visita sitio web</a></button>
    </div>
  </article>
_END;

return $noticias;
  }


  $arr = ["noticias" => $noticias];
echo json_encode($arr);

?>