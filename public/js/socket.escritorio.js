//comando para establecer la cocexion activa activa con el servidor
var socket = io();

var searchParams = new URLSearchParams(window.location.search); //para ver los parametros que vienen por URL

if(!searchParams.has('escritorio')){//en searchParams tengo todo lo que viene por url y con searchParams.has('escritorio') yo pregunto si el escritorio viene. si no viene, medevuelve false
    //si no viene el escritorio me salgo de esta pantalla
    window.location = ('index.html');
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio'); //obtengo el escritorio que viene por URL
var label = $('small');
console.log(escritorio);

//mostrar el escritorio en la pantalla.

$('h1').text('Escritorio ' + escritorio);

//elemento del click. estoy escuchando a ese boton
$('button').on('click', function(){

    socket.emit('atenderTicket', { escritorio: escritorio}, function(respuesta) {
        if(respuesta === 'No hay tickets'){
            label.text('Ya no hay Ticket');
            alert(respuesta);
            return;
        }
        label.text('Ticket' + respuesta.numero);
        console.log(respuesta);
        
    });
});
