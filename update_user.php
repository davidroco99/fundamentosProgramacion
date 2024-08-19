<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $apellido = isset($_POST['apellido']) ? trim($_POST['apellido']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if ($id > 0 && !empty($nombre) && !empty($apellido) && !empty($email)) {
        // Verificar si la contraseña fue modificada
        $passwordHash = !empty($password) ? ", contraseña='" . password_hash($password, PASSWORD_BCRYPT) . "'" : '';

        $sql = "UPDATE usuarios SET nombre='$nombre', apellido='$apellido', email='$email' $passwordHash WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo "Usuario actualizado con éxito";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Por favor complete todos los campos obligatorios.";
    }

    $conn->close();
}
?>
