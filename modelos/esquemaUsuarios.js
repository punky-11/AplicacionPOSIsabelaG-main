const { default: mongoose, Schema } = require("mongoose");
const coneccionBDMongo = require('../configuracion/coneccionBDMongo');


const Schemausuarios = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        require: true,
    },
    apellidoUsuario: {
        type: String,
        require: true,
    },
    telefonoUsuario:{
        type:String,
        unique: true,

    },
    documentoUsuario:{
        type:String,
        require:true,
        unique:true
    },
    ubicacionUsuario:{
        type:String,
    },
    correoElectronicoUsuario: {
        type: String,
        require: true,
        unique: true,
        
    },
    contraseñaUsuario: {
        type: String,
        require: true,
        unique: true,
    },

});

const nuevoUsuario = mongoose.model('usuarios', Schemausuarios)  // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports=nuevoUsuario;