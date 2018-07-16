const express = require('express');
const Data = require('../models/data');
const app = express();

let data = new Data({
    ultimo: 0,
    hoy: new Date().getDate()
});
data.save( (err, dataStored) => {
    if(err){
        res.status(500).json({
            ok: false,
            err
        });
    }
    console.log('datos guardados', dataStored);
    
});