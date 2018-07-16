//========================PUERTO

PORT = process.env.PORT || 3000;


//========================ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';//si es dev, estoy en la base de datos de desarrollo

//========================BASEDATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {//si es dev, estoy en la base de datos de desarrollo
    urlDB = 'mongodb://localhost:27017/data-socket-colas';
} else { //sino, uso la url de mlab de mongo que ya esta en heroku config
    urlDB = process.env.MONGO_URL;//mongo_URL ya fue definido en heroku config
}

process.env.URLDB = urlDB;