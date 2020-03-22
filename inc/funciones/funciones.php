<?php 

//Obtiene la pagina actual que se ejecuta
function obtenerPaginaActual(){
    $archivo = basename($_SERVER['PHP_SELF']);
    $pagina = str_replace(".php", "", $archivo);
    //echo $pagina;
    return $pagina;
}

/**Consultas **/

/**Obtener todos los proyectos**/
function obtenerProyectos(){
    include 'conexion.php';
    try {
        return $conn->query('SELECT id, nombre FROM proyectos');
    } catch (Exception $e) {
        echo "Error! " . $e->getMessage();
        return false;
    }
}