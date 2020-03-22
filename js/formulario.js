eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e){
    // preventDefault se utiliza para impedir que se envie un formulario, que es su accion predeterminada al pulsar el boton submit
    e.preventDefault();
    // console.log('aqui vamos');

    //Para validar que los campos tengan algo escrito
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;
        //console.log(usuario + "" + password);
    if (usuario === '' || password === '') {
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: '¡Ambos campos son obligatorios!'
          })
    }else{
        //Capos correctos, mandar ejecutar AJAX

        //Datos que se envian al servidor
        var datos = new FormData();
        datos.append('usuario', usuario);
        datos.append('password', password);
        datos.append('accion', tipo);
            //console.log(datos.get('usuario'));

        //Crear el llamado a AJAX
        var xhr = new XMLHttpRequest;

        //Crear el llamado a AJAX
        xhr.open('POST', 'inc/modelos/modelos-admin.php', true);

        //Retorno de datos
        xhr.onload = function(){
            if (this.status === 200) {
                //console.log(JSON.parse(xhr.responseText));
                var respuesta = JSON.parse(xhr.responseText);

                console.log(respuesta);
                //Si la respuesta es correcta
                if (respuesta.respuesta === 'correcto') {
                    //Si es un nuevo usuario:
                    if (respuesta.tipo === 'crear') {
                        Swal.fire({
                            type: 'success',
                            title: 'Usuario Creado',
                            text: 'El usuario se creo correctamente'
                          })
                    } else if(respuesta.tipo === 'login'){
                        Swal.fire({
                            type: 'success',
                            title: 'Login correcto',
                            text: 'Presiona ok'
                          })
                          .then(resultado =>{
                              if (resultado.value) {
                                  window.location.href = 'index.php';
                              }
                          })
                    }              
                    
                }else{
                    //Hubo un error
                    Swal.fire({
                        type: 'error',
                        title: 'Error  :(',
                        text: 'Hubo un error'
                      })
                }
            }
        }

        //Enviar la petición
        xhr.send(datos);

    }
}