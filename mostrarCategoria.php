<?php
require("db.php");

$palabra = $_GET['q'];
//console.log("this is a test  2 for a msg in console");
$sql = "SELECT categoria FROM noticias";
$result = mysqli_query($conn, $sql);
$categoria = array();

while ($row = $result->fetch_array()) {
  $categoria[] = $row['categoria'];
}

$categoria = array_unique($categoria);
$categories="";

foreach ($categoria as $category){
  $categories .=mostrarCategorias($category) ;
}

$arr = ["categories" => $categories];

echo json_encode($arr);
mysqli_close($conn);

  function mostrarCategorias($categoria) { 
    $categorias= <<<_END
    <button type="button"  id="btnCat" class="btn btn-default btn-sm">
    <span class="caret"></span> $categoria
  </button>
_END;

return $categorias;
  }


 
?>