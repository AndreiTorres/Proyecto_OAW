<?php

$url = $_GET['q'];

echo $url;

$username = "root";
$password = "";
$database = "rssfeed";

$conn = mysqli_connect("localhost", $username, $password, $database); 

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully";



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
        $sql = "INSERT INTO noticias (titulo, link, descripcion, fecha, id_url) VALUES ('".$titulo."', '".$link."', '".$description."','".$pubDate."','".$id_url."')";
        $result = mysqli_query($conn, $sql);
        $i++;
        
        }

        echo "Se agregaron las noticias.";
    }

?>