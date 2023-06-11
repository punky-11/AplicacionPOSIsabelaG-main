const rutasCRUD = require('../controladores/usuarios');
const express =require('express');
const router = express.Router();

router.get('/inicio',rutasCRUD.paginaprincipal); // ruta para mostrar el landing



//PARTE USUARIOS
router.get('/iniciarsesion', rutasCRUD.iniciarsesion); // ruta para formuolario inicio de sesion

router.get('/formulario', rutasCRUD.formularioRegistro); // ruta para mostrar el formulario de resgistro nuevo usuario

router.get('/tablaUsuarios', rutasCRUD.tablaUsuarios); //ruta para mostrar la tabla con la informacion de los usuarios registrados 

router.post('/registrar', rutasCRUD.registrarUsuario); // ruta para formulario registrar usuario

router.get('/eliminarU:', rutasCRUD.eliminarusuario);


//PARTE CATALOGO Y REGISTRO PRODUCTOS
router.get('/productos', rutasCRUD.paginaProductos);// ruta para mostrar el formulario y registrar un producto y al mismo tiempo muestra la tabla y todos los datos

router.post('/registrarProducto', rutasCRUD.registrarProductos); //link para llamar a la funcion de registrar producto en el formulario y funcione


//PARTE DE VENDEDORES

router.get('/Vendedores', rutasCRUD.formularioVendedores); // ruta para formulario registrar vendedores

router.get('/tablaVendedores', rutasCRUD.tablaVendedores); // ruta para ver la tabla de los vendedores y su registro de venta 

router.post('/registrarVendedor', rutasCRUD.registrarVendedor);



//PAGINA DE VENTAS
router.get('/ventas', rutasCRUD.ventas);

module.exports=router;

//CATALOGO
router.get('/catalogo', rutasCRUD.catalogo);

router.post('/enviar', rutasCRUD.enviar);

router.get('/descargarExcel', rutasCRUD.descargarExcel)



//graficos
router.get('/graficos', rutasCRUD.graficos);