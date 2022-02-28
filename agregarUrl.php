<?php
require("db.php");
$url = $_GET['q'];


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
    
     
    $sql = "INSERT INTO urls (nombre, enlace) VALUES ('".$site."','". $sitelink."')";
  
    if (mysqli_query($conn, $sql)) {
          //echo "New record created successfully";
    } else {
          //echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    // Obtener el id del sitio que se acaba de agregar
    $sql = "SELECT * FROM urls WHERE nombre= '".$site."'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $id_url = $row['id'];

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
        mysqli_close($conn);

        echo "Se agregaron las noticias.";
    }

?>