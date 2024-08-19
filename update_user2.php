<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $sql = "UPDATE usuarios SET nombre='$nombre', apellido='$apellido', email='$email', contraseña='$password' WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Usuario actualizado con éxito";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
}
?>
