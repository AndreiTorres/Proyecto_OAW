<?php
//if(!isset($_POST['search'])) exit('No se recibió el valor a buscar');

function search()
{
  require("db.php"); 
  $search = $_GET['q'];
//  $search = $conn->real_escape_string($_POST['search']);
  $search2= explode(" ",$search);;
  $query = "SELECT * FROM noticias WHERE titulo LIKE '%$search2[0]%' ";

  for($i = 1; $i < count($search2); $i++) {
    if(!empty($search2[$i])) {
        $query .= "and titulo LIKE '% $search2[$i] %'";
        
    }    
  }
  $query .= "LIMIT 7";

  $res = $conn->query($query);
  $noticias="";
  while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
    $noticias .= mostrar($row['titulo'], $row['link'], $row["descripcion"], $row['fecha']);   
  }
  $arr = ["noticias" => $noticias];
  echo json_encode($arr);

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

search();

?>