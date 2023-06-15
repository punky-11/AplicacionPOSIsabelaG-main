const{default: mongoose, Schema} = require("mongoose");
const coneccionBDMongo = require('../configuracion/coneccionBDMongo');

const Schemaimagen = new mongoose.Schema({
    nombre:{
        type:String,
    },
    image:{
        data:Buffer,
        contentType: String
    }
})

module.exports =ImageModel= mongoose.model('ImageModel', Schemaimagen);