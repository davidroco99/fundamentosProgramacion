<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar y sanitizar los datos recibidos
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $apellido = isset($_POST['apellido']) ? trim($_POST['apellido']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (!empty($nombre) && !empty($apellido) && !empty($email) && !empty($password)) {
        // Encriptar la contraseña antes de guardarla
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES ('$nombre', '$apellido', '$email', '$passwordHash')";

        if ($conn->query($sql) === TRUE) {
            echo "Nuevo usuario creado con éxito";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Por favor complete todos los campos.";
        error_log("Datos recibidos: Nombre: $nombre, Apellido: $apellido, Email: $email, Password: $password");
    }
    
    $conn->close();
    error_log("Datos recibidos: Nombre: $nombre, Apellido: $apellido, Email: $email, Password: $password");

}

//console.log("Nombre: " + nombre + " Apellido: " + apellido + " Email: " + email + "Password" + password );
?>
