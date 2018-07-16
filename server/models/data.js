var mongoose = require('mongoose'); //para la conexion a la base de datos

// para Schema de base de datos
//permite crear un opbjeto tipo schema.
var Schema = mongoose.Schema;

var DataSchema = Schema({
    ultimo: String,
    hoy: Number,
    tickets: [],
    ultimos4: []
});

//para poder utilizar este modelo fuera de este fichero
module.exports = mongoose.model('Data', DataSchema);