const vendedor = require('../modelos/esquemaVendedores');

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
//eliminar vendedor

exports.eliminarVendedor = async (req, res) => {
    let id = req.params.id
    await vendedor.findByIdAndDelete({ "_id": id });
    res.redirect('/tienda/v1/tablaVendedores')


}

exports.actualizarVendedor = async (req, res) => {
    let id = { _id: req.body.idn }
    let actu = {
        nombreVendedor: req.body.nombreVendedor,
        documentoVendedor: req.body.documentoVendedor
    }
    await vendedor.findOneAndUpdate(id, actu);
    res.redirect('/tienda/v1/tablaVendedores')

    console.log(actu)
}






// //TODO SOBRE UN VENDEDOR SU RESGISTRO Y VENTAS -----------------

// exports.formularioVendedores = (req, res) => {
//     res.render('../vistas/vendedores/formularioRegistrarVendedor')
// }

// exports.tablaVendedores = async (req, res) => {
//     let tablaVendedores = await vendedor.find();
//     res.render('../vistas/vendedores/tablaVendedores', {
//         "vendedores": tablaVendedores,
//     })
// }


// exports.registrarVendedor = (req, res) => {
//     const nuevoVendedor = new vendedor({
//         nombreVendedor: req.body.nombreVendedor,
//         apellidoVendedor: req.body.apellidoVendedor,
//         telefonoVendedor: req.body.telefonoVendedor,
//         ubicacionVendedor: req.body.ubicacionVendedor,
//         correoVendedor: req.body.correoVendedor,
//         documentoVendedor: req.body.documentoVendedor,
//     });
//     nuevoVendedor.save();
//     res.redirect('/tienda/v1/tablaVendedores')
// }
// //eliminar vendedor

// exports.eliminarVendedor = async (req, res) => {
//     let id = req.params.id
//     await vendedor.findByIdAndDelete({ "_id": id });
//     res.redirect('/tienda/v1/tablaVendedores')


// }

// exports.actualizarVendedor = async (req, res) => {
//     let id = { _id: req.body.idn }
//     let actu = {
//         nombreVendedor: req.body.nombrevendedorn,
//         documentoVendedor: req.body.documentov
//     }
//     await vendedor.findOneAndUpdate(id, actu);
//     res.redirect('/tienda/v1/tablaVendedores')

//     console.log(actu)
// }
