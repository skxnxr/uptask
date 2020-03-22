eventListeners();

//Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    // boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
    
}

function nuevoProyecto(e) {
    e.preventDefault(); 
    //console.log('Presionaste en nuevo proyecto');

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
                        <a href="index.php?id_respuesta=${id_proyecto}" id="${id_proyecto}">
                            ${proyecto}
                        </a>
                    `;
                    //Agregar al HTML
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