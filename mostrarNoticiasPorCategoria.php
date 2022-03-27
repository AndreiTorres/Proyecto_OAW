<?php
require("db.php");

$categoria = $_GET['q'];


$sql = "SELECT * FROM noticias WHERE categoria= '".$categoria."'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

$noticias = "";
while ($row = $result->fetch_array()) {
    $noticias .= mostrar($row['titulo'], $row['link'], $row["descripcion"], $row['fecha'], $row['imagen']);
  }


  function mostrar($titulo, $link, $descripcion, $fecha, $imagen) { 
    $noticias = <<<_END
    <article class="tarjeta">
    <div class="image">
      <img src="$imagen" alt="" />
    </div>
    <div class="informacion">
    
      <h3>
        $titulo
      </h3>
      Publicado el
      <time datetime="2012-10-15T12:00">$fecha</time>
      
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