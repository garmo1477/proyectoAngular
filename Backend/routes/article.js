'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

//para poder crear rutas
var router = express.Router();
//cargamos el modulo multiparty y lo guardamos en la variable
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/articles' });

//rutas de prueba
router.post('/datos', ArticleController.datosCurso);
router.get('/test-controller', ArticleController.test);

// rutas útiles
router.post('/save', ArticleController.save);
//para que saque los ultimos articulos y q sea opcional se pone ?
router.get('/articles/:last?', ArticleController.getArticles);

router.get('/article/:id', ArticleController.getArticle);

//ruta para el método update
router.put('/article/:id', ArticleController.update);

router.delete('/article/:id', ArticleController.delete);
//hacemos que sea opcional enviar id de imagen
router.post('/upload-image/:id?', md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);


module.exports = router; //exportando las rutas
