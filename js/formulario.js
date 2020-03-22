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
            icon: 'error',
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
                            icon: 'success',
                            title: 'Usuario Creado',
                            text: 'El usuario se creo correctamente'
                          })
                     } // else if(respuesta.tipo === 'login'){
                    //     Swal.fire({
                    //         icon: 'success',
                    //         title: 'Login correcto',
                    //         text: 'Presiona ok'
                    //       })
                    //       .then(resultado =>{
                    //           if (resultado.value) {
                    //               window.location.href = 'index.php';
                    //           }
                    //       })
                    // }
                    
                    //Nueva ventana para el tipo login     
                    else if(respuesta.tipo === 'login'){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'center',
                            showConfirmButton: false,
                            timer: 2000,
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
                            icon: 'success',
                            title: 'Logueado correctamente'
                          })       
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

        //Enviar la petición
        xhr.send(datos);

    }
}