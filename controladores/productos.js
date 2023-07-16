const productos = require('../modelos/esquemaCatalogo');
//-PRODUCTOS----------------------------------------------


exports.paginaProductos = async (req, res) => {
    let tablaProductos = await productos.find().sort({});
    res.render('registrarProducto', {
        "productos": tablaProductos,
    })

} // pagina donde se muestra el formulario para registrar y tambien muestra el catalogo

exports.eliminarproducto = async (req, res) => {
    let id = req.params.id
    await productos.findByIdAndDelete({ "_id": id });

    res.redirect('/tienda/v1/productos')

}//funcion para eliminar producto 

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


