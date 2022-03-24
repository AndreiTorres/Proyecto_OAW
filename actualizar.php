<?php
require("db.php");

$nombre = $_GET['q'];
$id_url = "";

$url = "";
$sql = "SELECT id, enlace FROM urls WHERE nombre = '".$nombre."'";
$id = mysqli_query($conn, $sql);

while ($row = $id->fetch_assoc()) {
    echo $row['id'];

    $sql1 = "DELETE FROM noticias WHERE id_url='".$row['id']."'";
    $result = mysqli_query($conn, $sql1);
    $url = $row['enlace'];
    $id_url = $row['id'];

}

echo $url;
if (@simplexml_load_file($url)) {
    $feeds = simplexml_load_file($url);
} else {
    $invalidurl = true;
    echo "Invalid RSS feed URL";
}

$i=0;
if (!empty($feeds)) {
$site = $feeds->channel->title;
$sitelink = $feeds->channel->link;

$noticias = "";
foreach ($feeds->channel->item as $item) {
    if($i>=10) break;
    $titulo = $item->title;
    $link = $item->link;
    $description = $item->description;
    $postDate = $item->pubDate;
    $pubDate = date('D, d M Y',strtotime($postDate));
    
    // Limpia las cadenas antes de ingresarlas a la bd
    $titulo = mysqli_real_escape_string( $conn, $titulo);
    $link = mysqli_real_escape_string( $conn, $link);
    $description = mysqli_real_escape_string($conn, $description);
    $pubDate = mysqli_real_escape_string($conn, $pubDate);

    $sql = "INSERT INTO noticias (titulo, link, descripcion, fecha, id_url) VALUES ('".$titulo."', '".$link."', '".$description."','".$pubDate."','".$id_url."')";
    $result = mysqli_query($conn, $sql);
    $i++;
    
    }

    echo "Se agregaron las noticias.";
}

mysqli_close($conn);
?>