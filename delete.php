<?php
require("db.php");

$nombre = $_GET['q'];

$sql = "DELETE FROM urls WHERE nombre='".$nombre."'";
$result = mysqli_query($conn, $sql);
mysqli_free_result($result);
mysqli_close($conn);
?>