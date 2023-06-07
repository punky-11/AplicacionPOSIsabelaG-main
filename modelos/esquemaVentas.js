const {default: mongoose} = require('mongoose')
const coneccionBDMongo = require('../configuracion/coneccionBDMongo')


const Schemaventas = new mongoose.Schema({
    producto:{
        type:String,
        require:true,
    },
    subtotal:{
        type:Number,
        require:true,
    },
    fechaVenta:{
        type:Date,
        require:true,
    },
    impuestos:{
        type:Number,
        require:true,
    },
    totaldeventa:{
        type:Number,
        require:true,
    },
    clienteComprador:{
        type:String,
        require:true,
    },
    vendedor:{
        type:String,
        require:true,
    },

})