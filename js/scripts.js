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
            console.log(JSON.parse(xhr.responseText));
        }
    }
    
    //Enviar el Request
    xhr.send(datos);


    //Inyectar el HTML
    // var nuevoProyecto = document.createElement('li');
    // nuevoProyecto.innerHTML = `
    //     <a href="#">
    //         ${nombreProyecto}
    //     </a>
    // `;
    // listaProyectos.appendChild(nuevoProyecto);
} 