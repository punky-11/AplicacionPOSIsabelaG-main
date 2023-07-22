const rutasCRUD = require('../controladores/usuarios');
const rutasVendedor = require('../controladores/vendedores');
const rutasProducto = require('../controladores/productos');


const {body, validationResult} = require('express-validator');
const express =require('express');
const router = express.Router();

router.get('/inicio',rutasCRUD.paginaprincipal); // ruta para mostrar el landing
 //navbar 2
 router.get('/navbar2',rutasCRUD.navbar2)
//administradores
router.get('/administradores', rutasCRUD.administadores)

//PARTE USUARIOS
router.get('/iniciarsesion', rutasCRUD.iniciarsesion); // ruta para formuolario inicio de sesion


router.get('/formulario', rutasCRUD.formularioRegistro); // ruta para mostrar el formulario de resgistro nuevo usuario

router.get('/tablaUsuarios', rutasCRUD.tablaUsuarios); //ruta para mostrar la tabla con la informacion de los usuarios registrados 

router.post('/registrar',[body('Nombre', 'Ingresa un nombre').exists().isLength({min:1, max:30}),
body('Apellido', 'Ingresa un apellido').exists().isLength({min:1, max:30}),
body('Telefono', 'Ingresa  tu numero').exists().isLength({min:1, max:30}),
body('Documento', 'Ingresa tu documento').exists().isLength({min:1, max:30}),
body('Dirección', 'Ingresa una direccion').exists().isLength({min:1, max:30}),
body('correo', 'Ingresa un E-mail valido').exists().isLength({min:1, max:30}),
body('contraseña', 'Ingresa una contraseña segura').exists().isLength({min:1, max:30}),


],rutasCRUD.registrarUsuario); // ruta para formulario registrar usuario

router.get('/eliminarU/:id', rutasCRUD.eliminarusuario);//eliminar usuario
router.post('/actualizarusuario', rutasCRUD.actualizarusuario);

router.post('/autenticar',[
    body('correoElectronicoUsuario','ingrese un correo').exists().isLength({min:1, max:100}),
    body('contraseñaUsuario', 'ingrese contraseña').exists().isLength({min:1, max:100})
],rutasCRUD.autenticar);

//PARTE CATALOGO Y REGISTRO PRODUCTOS
router.get('/productos', rutasCRUD.paginaProductos);// ruta para mostrar el formulario y registrar un producto y al mismo tiempo muestra la tabla y todos los datos

router.post('/registrarProducto',[body('referencia', 'Ingresa una referencia').exists().isLength({min:1, max:30}),
body('nombre', 'Ingresa un nombre').exists().isLength({min:1, max:30}),
body('descripcion', 'Ingresa  la descripcion').exists().isLength({min:1, max:30}),
body('precio', 'Ingresa un precio').exists().isLength({min:1, max:30}),
body('stock', 'Ingresa un stock').exists().isLength({min:1, max:30}),
body('habilitado', 'ingresa si esta habilitado').exists().isLength({min:1, max:30}),


], rutasCRUD.registrarProductos); //link para llamar a la funcion de registrar producto en el formulario y funcione

router.get('/eliminarP/:id', rutasCRUD.eliminarproducto); //eliminar producto
router.post('/actualizarproducto', rutasCRUD.actualizarProducto);


//PARTE DE VENDEDORES

router.get('/Vendedores', rutasVendedor.formularioVendedores); // ruta para formulario registrar vendedores

router.get('/tablaVendedores', rutasVendedor.tablaVendedores); // ruta para ver la tabla de los vendedores y su registro de venta 

router.post('/registrarVendedor', rutasVendedor.registrarVendedor);
router.get('/eliminarV/:id', rutasVendedor.eliminarVendedor);//eliminar vendedor
router.post('/actualizarV', rutasVendedor.actualizarV);


//PAGINA DE VENTAS
router.get('/ventas', rutasCRUD.ventas);

module.exports=router;

//CATALOGO
router.get('/catalogo', rutasCRUD.catalogo);

router.post('/enviar', rutasCRUD.enviar);

router.get('/descargarExcel', rutasCRUD.descargarExcel)


router.post('/uploads', rutasCRUD.uploadImagen)
//graficos
router.get('/graficos', rutasCRUD.graficarProductos);


//OTROS
router.get('/otros', rutasCRUD.otros);