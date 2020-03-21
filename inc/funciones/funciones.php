<?php 

function obtenerPaginaActual(){
    $archivo = basename($_SERVER['PHP_SELF']);
    echo $archivo;
}
obtenerPaginaActual();