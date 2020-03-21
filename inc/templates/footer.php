<script src="js/sweetalert2.all.min.js"></script>


<?php
//Para incluir librerias solamente en ciertas paginas:
    $actual = obtenerPaginaActual();
    //var_dump($actual);

    if ($actual === 'crear-cuenta' || $actual === 'login') {
        echo '<script src="js/formulario.js"></script>';
    }

?>


</body>
</html>