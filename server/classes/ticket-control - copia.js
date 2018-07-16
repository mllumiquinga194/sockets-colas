const express = require('express');
const Data = require('../models/data');
const fs = require('fs');
const app = express();

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;//para saber que el ultimo es el ultimo de la data guardada
        } else {
            //para reinicializar el sistema
            this.reiniciarConteo();
        }

    }

    siguiente() {

        this.ultimo += 1;

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        
        return `Ticket ${this.ultimo}`;
    }


    reiniciarConteo() {

        this.ultimo = 0;
        console.log('Se ha reinicializado el conteo');
        this.grabarArchivo();

    }

    // esta funcion me guarda en el archivo
    grabarArchivo() {
        
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy
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


// const express = require('express');
// const Data = require('../models/data');
// const fs = require('fs');
// let data = require('../data/data.json');

// class TicketControl {

//     constructor() {
//         this.datos = {};
//         this.ultimo = 0;
//         this.hoy = new Date().getDate();

//         if (new Date().getDate() === this.hoy) {

//             //para saber que el ultimo es el ultimo de la data guardada
//             Data.findOne({ hoy: this.hoy }, (err, dataStored) => {
//                 if (err) {
//                     {
//                         ok: false,
//                             err
//                     };
//                 } else {
//                     if (!dataStored) {
//                         {
//                             ok: false,
//                                 err
//                         };
//                     } else {

//                         console.log('datos guardados', dataStored);
//                         this.datos = dataStored;
//                         this.ultimo = Number(this.datos.ultimo);
//                     }
//                 }
//             });
//         } else {
//             //para reinicializar el sistema
//             this.reiniciarConteo();

//             let data = new Data({
//                 ultimo: 0,
//                 hoy: new Date().getDate()
//             });

//             data.save((err, dataStored) => {
//                 if (err) {
//                     res.status(500).json({
//                         ok: false,
//                         err
//                     });
//                 }
//                 console.log('datos guardados', dataStored);
//                 this.datos = dataStored;
//             });
//         }
//     }



//     siguiente() {

//         this.ultimo += 1;

//         this.grabarArchivo();

//         return `Ticket ${this.ultimo}`;
//     }

//     getUltimoTicket() {

//         return `Ticket ${this.ultimo}`;
//     }


//     reiniciarConteo() {

//         this.ultimo = 0;
//         console.log('Se ha reinicializado el conteo');
//         this.grabarArchivo();
//     }

//     // esta funcion me guarda en el archivo
//     grabarArchivo() {
//         let data = {
//             ultimo: this.ultimo,
//             hoy: this.hoy
//         }

//         Data.findByIdAndUpdate(this.datos._id, data, (err, dataFind) => {
//             if (err) {
//                 res.status(500).json({
//                     ok: false,
//                     err
//                 });
//             }
//             //console.log(dataFind);

//         });

//         // let jsonData = {
//         //     ultimo: this.ultimo,
//         //     hoy: this.hoy
//         // }
//         // // guardo los datos en un string de json
//         // let jsonDataString = JSON.stringify(jsonData);

//         // //para usar esto tuve que inportarel fs
//         // fs.writeFileSync('./server/data/data.json', jsonDataString);
//     }


// }



// module.exports = {
//     TicketControl
// }