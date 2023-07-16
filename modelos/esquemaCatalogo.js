const {default:mongoose}=require("mongoose");
const coneccionBDMongo = require('../configuracion/coneccionBDMongo')


const SchemaCatalogo = new mongoose.Schema({

   referencia:{
    type:String,
    require:true,
   },
   nombre:{
    type:String,
    require:true,
   },
   descripcion:{
    type:String,
    require:true
   },
   precio:{
    type:Number,
    require:true,
   },
   stock:{
    type:Number,
    require:true,
   },
   habilitado:{
      type:String,
      require:true
     },
  
   imagenUrl:{
    type:String,
    require:true,
   },
  



});

const nuevoProducto = mongoose.model('productos', SchemaCatalogo); // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports=nuevoProducto;
