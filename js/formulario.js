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
        password = document.querySelector('#password').value;
        //console.log(usuario + "" + password);
    if (usuario === '' || password === '') {
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: '¡Ambos campos son obligatorios!'
          })
    }else{
        
    }
}