<?php

$accion = $_POST['accion'];
$id_proyecto = (int) $_POST['id_proyecto'];
$tarea = $_POST['tarea'];
$estado = $_POST['estado'];

if($accion === 'crear'){

    //Importar la conexion
    include '../funciones/conexion.php';
    try {
        //Realiza la consulta a la base de datos
        $stmt = $conn->prepare("INSERT INTO tareas (nombre, id_proyecto) VALUES (?,?)");
        $stmt->bind_param('si', $tarea, $id_proyecto);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion,
                'tarea' => $tarea
            );
        }else{
            $respuesta = array(
                'respuesta' => 'error'
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
if($accion === 'actualizar'){
    echo json_encode($_POST);
}