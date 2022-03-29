<?php
session_start();

$conn = mysqli_connect(
  'localhost',
  'root',
  'root',
  'rssfeed'
) or die(mysqli_error($mysqli));
?>