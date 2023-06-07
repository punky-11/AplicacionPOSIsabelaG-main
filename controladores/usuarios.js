const modelos = require('../modelos/esquemaUsuarios');
const productos = require('../modelos/esquemaCatalogo');
const vendedor = require('../modelos/esquemaVendedores');

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
    let documentoUsuario = req.params.Documento
    await productos.findByIdAndDelete(documentoUsuario);
    res.redirect('/')
    console.log(eliminarusuario);
    

}

/*exports.eliminarMascota = async (req, res) => {
    let id = req.params.id
    await mascota.findByIdAndDelete({ "_id": id });

    res.redirect("/api/v1/mascotas")
}
 */

//--USUARIO INICIAR SESION--------------
exports.iniciarsesion = (req, res) => {
    res.render('../vistas/usuarios/iniciarsesion')
}


//---------PAGINA DE VENTAS-----------------
exports.ventas = (req, res) => {
    res.render('paginaDeVentas')
}

//catalogo carrito

