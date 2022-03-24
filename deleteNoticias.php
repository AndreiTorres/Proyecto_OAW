<?php
require("db.php");

$nombre = $_GET['q'];

$sql = "DELETE FROM noticias";
$result = mysqli_query($conn, $sql);
mysqli_free_result($result);
mysqli_close($conn);
?>