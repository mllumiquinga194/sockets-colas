//comando para establecer la cocexion activa activa con el servidor
var socket = io();

var label = $('#lblNuevoTicket'); //es una referencia directa a esta etiqueta ya que la voy a usar muchas veces, esta etiqueta esta en el html

socket.on('connect', function () {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');

});

socket.on('estadoActual', function (ultimo) {

    console.log(ultimo);
    label.text(ultimo.actual);

});

$('button').on('click', function () {

    socket.emit('siguienteTicket', null, function (siguienteTicket) {

        label.text(siguienteTicket);
    });

});
