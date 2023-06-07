const {default: mongoose} = require('mongoose');
const coneccionBDMongo = require ('../configuracion/coneccionBDMongo')



const Schemavendedores = new mongoose.Schema({
    nombreVendedor:{
        type:String,
        require:true,
    },
    apellidoVendedor:{
        type:String,
        require:true,
    },
    telefonoVendedor:{
        type:String,
        require:true,
        unique:true,
    },
    ubicacionVendedor:{
        type:String,
        require:true,
    },
    correoVendedor:{
        type:String,
        require:true,
    },
    documentoVendedor:{
        type:String,
        unique:true,
        require:true,
    },
    ventasdespachadas:{
        type:String,
        require:true
    }

});


const nuevoVendedor = mongoose.model('vendedores', Schemavendedores)  // en esta parte  creamos la coleccion vendedores y le agregamos el esquema vendedores creada anteriormente
module.exports=nuevoVendedor;