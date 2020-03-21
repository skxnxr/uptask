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

    $respuesta = array(
        'pass' => $hash_password
    );
    echo json_encode($respuesta);
}

if($accion === 'login'){
    //Código loguear los administradores
}