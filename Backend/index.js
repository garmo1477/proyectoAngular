'use strict' //que sea más moderno y estricto

//cargar modulo de mongoose y modulo de js
var mongoose = require('mongoose');
var app = require('./app');
var port = 3900; //el puerto

//desactivar metodos antiguos
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

//conexion a mongodb base de datos
// URL y opciones, lo que se ponde dentro de connect
 mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log('La conexion a la base de datos se ha realizado correctamente');
        //crear el servidor y poner a escuchar peticiones http
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:'+port);
        });
    });
