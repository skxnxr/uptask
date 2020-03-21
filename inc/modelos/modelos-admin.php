<?php

$usuario = $_POST['usuario'];
$password = $_POST['password'];
$accion = $_POST['accion'];

if($accion === 'crear'){
    //Código para crear los administradores

    //hashear passwords
    $opciones = array(
        'cost' => 12
    );
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

    //Importar la conexion
    include '../funciones/conexion.php';
    try {
        //Realiza la consulta a la base de datos
        $stmt = $conn->prepare("INSERT INTO usuarios (usuario, password) VALUES (?,?)");
        $stmt->bind_param('ss', $usuario, $hash_password);
        $stmt->execute();
        if ($stmt->affected_rows) {
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        //En caso de error, tomar la excepción
        $respuesta = array(
                'error' => $e->getMessage()
            );
    }

        // $respuesta = array(
        //     'pass' => $hash_password
        // );
     echo json_encode($respuesta);

}

if($accion === 'login'){
    //Código loguear los administradores
}