const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');//Middleware
const morgan = require('morgan');//Middleware
const routes = require('./routes/index.js');//Rutas

require('./db.js');

//Ejecutamos el Servidor de express
const server = express();

//Le damos un nombre al server.name
server.name = 'API';

//Middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));//Creamos el middleware de morgan
server.use((req, res, next) => {//middleware que sirve para configurar corst (este permite o niega el acceso el acceso desde otra direccion)
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //permite que haga conexiones desde localhost:3000 (actualice para que coincida con el dominio desde el que realizará la solicitud)
  res.header('Access-Control-Allow-Credentials', 'true');//permite que podamos mandar credenciales
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');//permiten los headers que tengan Origin,  X-Requested-With, Content-Type, Accept
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');//permitimos solo los metodos de control GET, POST, OPTIONS, PUT, DELETE
  next();
});

server.use('/', routes);// apenas pongamos la ruta / vamos a ir a las rutas en routes/index.js

// Error catching endware. (manejamos el control de errores)
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;// va a generar un status tomando el status del error mandado, si no tiene tomara el status 500
  const message = err.message || err;// va setear el message del error que le hayamos puesto y si no lo tiene simpletmente setea el error
  console.error(err);//muestra el err
  res.status(status).send(message);// manda el estatus y el message que seteamos arriba
});

//si colocamos los errores con el next asi --> catch(e => next(e))
//el codigo de arriba va agarrar dicho error y trabajarlo, la estructura conm el es
/*
(req, res, next)=>{
  catch(e => next(e))
}
*/
module.exports = server;
