<?php
    $conn = new mysqli('localhost', 'root', 'root', 'uptask');

    //Se muestra en la pagina web si hay algun error con la BD
    if($conn->connect_error){
        echo $conn->connect_error;
    }

    //Para mostrar todos los caracteres correctamente (ñ, acentos):
    $conn->set_charset('utf-8');

    
    //Para visualizar la correcta conexion escribir:
    // echo "<pre>";
    //     var_dump($conn);
    // echo "</pre>";

    // Incluirlo en alguna pagina, index.php por ejemplo como:
    // include 'inc/funciones/conexion.php';
    // Recargar la pagina y verificar que la pagina aparezca null en el campo:
    //     ["connect_error"]=>
    //     NULL


    // OTRA FORMA ES:
    // echo "<pre>";
    //     var_dump($conn->ping());
    // echo "</pre>";
    //Si todo esta correcto, en la pagina debe aparecer:
    // bool(true)