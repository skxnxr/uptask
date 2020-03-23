eventListeners();

// lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    // boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
    
    //Boton para una nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

    //Boton para las acciones de las tareas
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
    
}

function nuevoProyecto(e) {
    e.preventDefault(); 
    //console.log('Presionaste en nuevo proyecto');
var listaProyectos = document.querySelector('ul#proyectos');

    //Crea un input para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type ="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    //Seleionar el ID con el nuevo proyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    //Al presionar enter crea el nuevo proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e){
       var tecla = e.which || e.keyCode;
       
       if (tecla === 13) {
        //    console.log('Presionaste Enter');
            guadarProyectoDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
       }
    });

}

function guadarProyectoDB(nombreProyecto) {
    // console.log(nombreProyecto);

    // Crear llamado ajax
    var xhr = new XMLHttpRequest();
    
    // enviar datos por formdata
    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');
    
    // Abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);
    
    // En la carga
    xhr.onload = function() {
        if(this.status === 200) {
            //obtener datos de la respuesta
            var respuesta = JSON.parse(xhr.responseText);
            var proyecto = respuesta.nombre_proyecto,
                id_proyecto = respuesta.id_insertado,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;

            //Comprobar la inserción
            if (resultado === 'correcto') {
                //Exitoso
                if (tipo === 'crear') {
                    // Se creó un nuevo proyecto
                    // Inyectar el HTML
                    var nuevoProyecto = document.createElement('li');
                    nuevoProyecto.innerHTML = `
                        <a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
                            ${proyecto}
                        </a>
                    `;
                    // agregar al html
                    listaProyectos.appendChild(nuevoProyecto);

                    //Crear Alerta
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'center',
                        showConfirmButton: true,
                        timer: 5000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                        ,onClose: () => {
                            window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                       }
                      })
                      Toast.fire({
                        icon: 'success',
                        title: 'Proyecto: ' + proyecto + '\n Creado correctamente'
                        // text: 'creado correctamente'
                      })

                }else{
                    //Se actualizo o se eliminó
                }
            } else {
                //Hubo un error
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'center',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                    ,onClose: () => {
                        window.location.href = 'index.php';
                   }
                  })
                  Toast.fire({
                    icon: 'error',
                    title: 'Error'
                  })
            }
        }
    }
    
    //Enviar el Request
    xhr.send(datos);
} 

//Agregar una nueva tarea al proyecto actual
function agregarTarea(e) {
    e.preventDefault();
    // console.log('clic en el booton');
    var nombreTarea = document.querySelector('.nombre-tarea').value;
    if (nombreTarea === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error  :(',
            text: 'Una tarea no puede ir vacía'
          })
    }else{
        //La tarea tiene algo, insertar en php
        // crear llamado a ajax
        var xhr = new XMLHttpRequest();
        
        // crear formdata
        var datos = new FormData();
        datos.append('tarea',nombreTarea );
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value );
        
        // Abrir la conexion
        xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);
        
        
        // ejecutarlo y respuesta
        xhr.onload = function() {
            if(this.status === 200) {
                var respuesta = JSON.parse(xhr.responseText);
                
                // asignar valores
                var resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    id_insertado = respuesta.id_insertado,
                    tipo = respuesta.tipo;
                
                if(resultado === 'correcto') {
                    // se agregó correctamente
                    if(tipo === 'crear') {
                        // lanzar la alerta
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'center',
                            showConfirmButton: true,
                            timer: 2200,
                            timerProgressBar: true,
                            onOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        //     ,onClose: () => {
                        //         window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                        //    }
                          })
                          Toast.fire({
                            icon: 'success',
                            title: 'La tarea: ' + tarea + '\n Se ha creado correctamente'
                            // text: 'creado correctamente'
                          })

                          //Construir el template
                          var nuevaTarea = document.createElement('li');
                       
                       // agregamos el ID
                       nuevaTarea.id = 'tarea:'+id_insertado;
                       
                       // agregar la clase tarea
                       nuevaTarea.classList.add('tarea');
                       
                       // construir el html
                       nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash"></i>
                            </div>
                       `;
                       
                       // agregarlo al HTML
                       var listado = document.querySelector('.listado-pendientes ul');
                       listado.appendChild(nuevaTarea);
                       
                       // Limpiar el formulario
                       document.querySelector('.agregar-tarea').reset();
                    }
                }else{
                    //Hubo un error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error  :(',
                        text: 'Hubo un error'
                      })
                }
            } 
        }
        // Enviar la consulta
        xhr.send(datos);
    }
}

//Cambia el estado de las tareas o las elimina (Delegation)

function accionesTareas(e){
    e.preventDefault();
    //console.log('click en el estado');
    //console.log(e.target);

    if (e.target.classList.contains('fa-check-circle')) {
        if (e.target.classList.contains('completo')) {
                e.target.classList.remove('completo');
                cambiarEstadoTarea(e.target, 0);
        }else{
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    }
    if (e.target.classList.contains('fa-trash')) {
        //console.log('click icono de borrar');
        Swal.fire({
            title: '¿Seguro(a)?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡Eliminalo!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {

                var tareaEliminar = e.target.parentElement.parentElement;

                //Borrar de la BD
                eliminarTareaBD(tareaEliminar);

                //Borrar del HTML
                //console.log(tareaEliminar);
                tareaEliminar.remove();

              Swal.fire(
                '¡Eliminado correctamente!',
                ' ',
                'success'
              )
            }
          })
    }

}

//Completa o descompleta una tarea (Traversing the DOM)

function cambiarEstadoTarea(tarea, estado){
    var idTarea = tarea.parentElement.parentElement.id.split(':');
    //console.log(idTarea[1]);

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    //console.log(estado);
    datos.append('estado', estado);

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    }
    // enviar la petición
    xhr.send(datos);
}

//Elimina las tareas de la BD
function eliminarTareaBD(tarea) {

    var idTarea = tarea.id.split(':');

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    }
    // enviar la petición
    xhr.send(datos);

}