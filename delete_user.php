<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM usuarios WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Usuario eliminado con éxito";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
        $conn->close();
}
?>
