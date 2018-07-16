const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {//data es el null que envio desde el cliente
        
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);

        callback(siguiente);
        
    });

    //emitir un evento estado actual.
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


//configuracion socket para atender tickets
    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                message: 'El escritorio es Necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket); //retornamos el ticket para que a persona en el front lo pueda trabajar

        //Actualizar, notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });



});