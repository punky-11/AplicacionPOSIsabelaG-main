// estamos 
const express = require('express')
const app = express();
const path = require('path');
const morgan=require('morgan');
const multer =require('multer')
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true})); // se necesita para que analice los req entrantes es decir las peticiones 
app.use(express.static('./estaticas'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log('estoy en linea desde el puerto: ' + PORT);
});

const ruta = require('./rutas/enrutamiento')

app.use('/tienda/v1',ruta);

//estamos definiendo el puerto y haciendo un console para comprobar que funcione







