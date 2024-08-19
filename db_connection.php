<?php
$servername = "bld0lwzimivhz7ejuy8n-mysql.services.clever-cloud.com";
$username = "urqbejdvapxc93pf";
$password = "btFUQrRa6YsGnW5UOsLN";
$dbname = "bld0lwzimivhz7ejuy8n";

// Crear conexión
$conn = new mysqli($servername, $username, $password,$dbname);
// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

?>