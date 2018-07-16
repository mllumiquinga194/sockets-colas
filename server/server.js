const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
require('./config/config'); //para configurar el puerto

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


//mongoose.Promise = global.Promise;
mongoose.connect(process.env.URLDB, {useNewUrlParser: true }, (err, res) => {
  if (err) throw err;
  else {
    console.log("la conexion a la base de datos esta funcionando correctamente...");

    server.listen(PORT, (err) => {
    
        if (err) throw new Error(err);
    
        console.log(`Servidor corriendo en puerto ${ PORT }`);
    
    });
  }
});




