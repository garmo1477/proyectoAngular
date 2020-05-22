'use strict'

//cargar modulos de node para crear el servidos
var express = require('express');
var bodyParser = require('body-parser');

// ejecutar express (http)
var app = express(); //dentro de express la app en si

// Cargar ficheros rutas
var article_routes = require('./routes/article'); //cargamos el modulo de rutas


// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CONFIGURAR EL CORS, ACCESO CRUZADO ENTRE DOMINIOS (sigue siendo middlewares)
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Activar el CORS

// añadir prefijos a rutas/ cargar rutas
app.use('/api', article_routes);

//Ruta o metodo de prueba para el API REST


// Exportar módulo de fichero actual
module.exports = app; //para que se pueda utilizar el objeto fuera de este fichero. objeto app