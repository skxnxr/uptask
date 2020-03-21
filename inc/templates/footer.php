<script src="js/sweetalert2.all.min.js"></script>


<?php
//Para incluir librerias solamente en ciertas paginas:
    $actual = obtenerPaginaActual();
    //var_dump($actual);

    if ($actual === 'crear-cuenta' || $actual === 'login') {
        echo '<script src="js/formulario.js"></script>';
        //echo '<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>';
    }

?>


</body>
</html>