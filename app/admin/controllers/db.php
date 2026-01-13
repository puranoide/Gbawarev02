<?php
$servername = "localhost";
$username = "u685818680_gabriel";
$password = "1r=bU~jdtSW";
$dbname = "u685818680_gabware"; 
// Create connection
/*
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gabware"; 


$servername = "localhost";
$username = "u685818680_gabriel";
$password = "1r=bU~jdtSW";
$dbname = "u685818680_gabware"; 

*/
$conexion = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conexion->connect_error) {
    die("Connection failed: " . $conexion->connect_error);
}
?>
