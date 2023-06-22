const modelos = require('../modelos/esquemaUsuarios');
const productos = require('../modelos/esquemaCatalogo');
const vendedor = require('../modelos/esquemaVendedores');
const nodemailer = require('nodemailer');
const ImageModel = require('../modelos/esquemaImagen');


//PAGINA PRINCIPAL LANDING
exports.paginaprincipal = (req, res) => {
    res.render('paginaPrincipal')
}

//TODO SOBRE UN VENDEDOR SU RESGISTRO Y VENTAS -----------------

exports.formularioVendedores = (req, res) => {
    res.render('../vistas/vendedores/formularioRegistrarVendedor')
}

exports.tablaVendedores = async (req, res) => {
    let tablaVendedores = await vendedor.find();
    res.render('../vistas/vendedores/tablaVendedores', {
        "vendedores": tablaVendedores,
    })
}


exports.registrarVendedor = (req, res) => {
    const nuevoVendedor = new vendedor({
        nombreVendedor: req.body.nombreVendedor,
        apellidoVendedor: req.body.apellidoVendedor,
        telefonoVendedor: req.body.telefonoVendedor,
        ubicacionVendedor: req.body.ubicacionVendedor,
        correoVendedor: req.body.correoVendedor,
        documentoVendedor: req.body.documentoVendedor,
    });
    nuevoVendedor.save();
    res.redirect('/tienda/v1/tablaVendedores')
}


//-PRODUCTOS----------------------------------------------


exports.paginaProductos = async (req, res) => {
    let tablaProductos = await productos.find().sort({});
    res.render('registrarProducto', {
        "productos": tablaProductos,
    })

} // pagina donde se muestra el formulario para registrar y tambien muestra el catalogo



exports.registrarProductos = (req, res) => {
    const registrarProducto = new productos({
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        habilitado: req.body.habilitado,

    });

    registrarProducto.save();

    res.redirect('/tienda/v1/productos')
}//funcion para guardar un producto


// funcion para mostrar el catalogo
exports.catalogo = async (req, res) => {
    let catalogo = await productos.find();
    res.render('../vistas/usuarios/catalogo', {
        'catalogo': catalogo
    })
}
//-REGISTRO DE USUARIOS ---------------------------------------------

exports.formularioRegistro = (req, res) => {
    res.render('../vistas/usuarios/formularioRegistrar')
} // mostrando el formulario para que un usuario se registre y mande la informacion a la base de datos

exports.tablaUsuarios = async (req, res) => {
    let tablaUsuarios = await modelos.find();
    res.render('../vistas/usuarios/tablaUsuarios', {
        "usuarios": tablaUsuarios,
    })
};  //tabla que muestra la informacion de los clientes registrados

exports.registrarUsuario = async (req, res) => {
    const registrarUsuario = new modelos({
        nombreUsuario: req.body.Nombre,
        apellidoUsuario: req.body.Apellido,
        telefonoUsuario: req.body.Telefono,
        documentoUsuario: req.body.Documento,
        ubicacionUsuario: req.body.Dirección,
        correoElectronicoUsuario: req.body.correo,
        contraseñaUsuario: req.body.contraseña,
    });
    registrarUsuario.save();

    res.redirect('/tienda/v1/tablaUsuarios')

    console.log(req.body)
} //funcion para que los datos del ususario sean guardados en ka base de datos y luego los muestre en la respectiva tabla para verlos


exports.eliminarusuario = async (req, res) => {
    let id = req.params.id
    await modelos.findByIdAndDelete({ "_id": id });

    res.redirect('/tienda/v1/tablaUsuarios')

}//funcion para eliminar usuario 

//actualizar usuario

exports.actualizarusuario= async(req, res)=>{
    const body =req.body
    
    let id = req.params.id
    await modelos.updateOne({ "_id": id },     body,
    (err, docs)=>{
        res.send({
            items:docs
        })
    });

}
//--------------------------

//--USUARIO INICIAR SESION--------------
exports.iniciarsesion = (req, res) => {
    res.render('../vistas/usuarios/iniciarsesion')
}


//---------PAGINA DE VENTAS-----------------
exports.ventas = (req, res) => {
    res.render('paginaDeVentas')
}







//ENVIAR CORREO DE MANERA SPAM

exports.enviar = (req, res) => {
const contenido = req.body.contenido;
const asunto = req.body.asunto;
const correo = req.body.correo;

console.log(contenido)
    console.log('entra')
     var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'igrisales01@misena.edu.co',
         pass: 'ltmnxypzhvkbzccn'
       }
     });

     var mailOptions = {
       from: 'igrisales01@misena.edu.co',
       to: correo,
       subject:asunto,
       text: contenido
     };

     transporter.sendMail(mailOptions, function (error, info) {
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
    }


    // GENERAR TABLA EXCEL DE LOS DATOS SOBRE LOS PRODUCTOS ----------------------------------------



const xl = require('excel4node');
const path = require('path')
const fs = require('fs');
const multer = require('multer');


exports.descargarExcel = async(req, res) => {
    //configuramos el excel4node

    //creamos un nuevo documento
    const wb = new xl.Workbook();
    //definimos el nombre con el cual se descargara el archivo 
    const nombreArchivo = 'TablaProductos';
    //se define el nombre 
    var ws = wb.addWorksheet(nombreArchivo);

    //definimos estilos
    const columnaEstilo = wb.createStyle({
        font: {
            name: 'Arial',
            color: '#AB2002',
            size: 12,
            bold: true,
        }
    });

    const contenidoEstilo = wb.createStyle({
        font: {
            name: 'Arial',
            color: '#565656',
            size: 11,
        }
    });

    //definimos el nombre de las columnas
    ws.cell(1, 1).string('referencia').style(columnaEstilo);
    ws.cell(1, 2).string('nombre').style(columnaEstilo);
    ws.cell(1, 3).string('descripcion').style(columnaEstilo);
    ws.cell(1, 4).string('precio').style(columnaEstilo);

    //llamamos a la base de datos
    const listaProductos = await productos.find()

    // definimos un contador que empiece en 2 
    let fila = 2;

    //agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos 
    
    listaProductos.forEach(datoProducto => {
    ws.cell(fila, 1).string(datoProducto.referencia).style(contenidoEstilo);
    ws.cell(fila, 2).string(datoProducto.nombre).style(contenidoEstilo);
    ws.cell(fila, 3).string(datoProducto.descripcion).style(contenidoEstilo);
    ws.cell(fila, 4).number(datoProducto.precio).style(contenidoEstilo);
    
    fila = fila +1;
    });

    const rutaExcel = path.join(__dirname,'excel'+ nombreArchivo +'.xlsx');

    //escribir y guardar en el documento 
    //se le inclulle la ruta y una funcion 
    wb.write(rutaExcel, function(err,stars){

        //capturamos y mostramos en caso de un error
        if(err)console.log(err);
        //creamos una funcion que descargue el archibo y lo elimine 
        else{

            //guardamos el documento en la carpeta para excel para poder descargarla en el pc
                res.download(rutaExcel);
                
                console.log('documento descargado correctamente');

                //Eliminamos el documento de la carpeta excel
                fs.rm(rutaExcel, function(err){
                    if(err)console.log(err);
                    else console.log('Archivo descargado y borrado del servidor correctamente');
                });
                
        }
    });

    
}





exports.graficarProductos=async(req, res)=>{
    const nombres =(await productos.find({}, {nombre:1,_id:0})).map(item => item.nombre);
    console.table(nombres);

    const stocks =(await productos.find({}, {stock:1,_id:0})).map(item => item.stock);
    console.table(stocks);
    res.render('graficosProductos',{
        "nombres":nombres,
        "stocks":stocks
    })

}


//publicar imagenes...

const Storage =multer.diskStorage({
    destination:'uploads',
    filename:(req, file, cb)=>{
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage:Storage
}).single('file')

exports.uploadImagen= (req, res)=>{
    upload(req, res, (err)=>{
        if (err){
            console.log(err)
        }
        else{
            const newImage = new ImageModel({
                nombre: req.body.nombre,
                image:{
                    data:req.file.file,
                    contentType:'image/jpg'
                }
            })
            newImage.save()
            .then(()=>res.send('imagen subida correctamente'))
        }
    })
}
