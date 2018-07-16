const express = require('express');
const Data = require('../models/data');
const fs = require('fs');

//clase para manipular los tickets
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        var data = require('../data/data.json');
        this.tickets = [];//inicializo mi arreglo de tickets
        this.ultimos4 = [];
        // var data = {
        //     ultimo: 100,
        //     hoy: 14
        // }

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;//para saber que el ultimo es el ultimo de la data guardada
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            //para reinicializar el sistema si es un dia diferente
            this.reiniciarConteo();

            let dataDb = new Data({//estos valores van a la base de datos
                ultimo: data.ultimo,
                hoy: data.hoy,
                tickets: data.tickets,
                ultimos4: data.ultimos4
            });

            dataDb.save((err, dataStored) => {//guardo en la base de datos para tener un registro de los tickets atenditos por dia
                if (err) {
                    { ok: false, err }
                } else {
                    if (!dataStored) {
                        { ok: false, err }
                    } else {
                        console.log('guardados los datos del dia de ayer', dataStored);
                    }
                }
            });
        }

    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);//creo una instancia de mi ticket y le indico que es el ultimo

        this.tickets.push(ticket);//lo agrego en mi arreglo de tickets pendientes


        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;

    }
    getUltimos4() {

        return this.ultimos4;
    }

    atenderTicket(escritorio) {//recibe un escritorio a quien le asignare un numero a atender

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        
        let numeroTicket = this.tickets[0].numero;// para obtener el numero del primer ticket del arreglo,
        this.tickets.shift();//para borrar el primer elemento de un arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio);//ya tengo un ticket listo para ser atendido.

        this.ultimos4.unshift(atenderTicket);//esta funcion agrega el elemento al inicio del arreglo. DARA la ilusion optica de que se iran moviendo los elementos porque al agregar uno nuevo, el que estaba de primero, pasa al segundo puesto

        //en este arreglo solo habran 4 ticket
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento de este arreglo de 4.
        }

        console.log('Ultimos 4 ', this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;


    }


    reiniciarConteo() {

        this.tickets = [];
        this.ultimos4 = [];
        this.ultimo = 0;
        console.log('Se ha reinicializado el conteo');
        this.grabarArchivo();

    }

    // esta funcion me guarda en el archivo
    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, // para grabar en el arreglo todos los tickets que esten pendiente de atender
            ultimos4: this.ultimos4
        }
        // guardo los datos en un string de json
        let jsonDataString = JSON.stringify(jsonData);

        //para usar esto tuve que inportarel fs
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }


}



module.exports = {
    TicketControl
}