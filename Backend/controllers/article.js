//clase
'use strict'
//modulos o librerias importados
var validator = require('validator');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');

var controller = {
    // al crear un método hay que crear tb su ruta, en article.js de routes
    datosCurso: (req, res) => {
        return res.status(200).send({
            curso: "Master en Frameworks",
            autor: 'Paloma',
            url: 'paloma.com'
        });
    },
    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de artículos'
        })
    },
    save: (req, res) => {
        //recoger parametros por post, los parametros que metemos en postMan en el Body
        var params = req.body;

        //validar datos con libreria validator
        try {
            //creamos variable para q cuando no este vacio lo valide
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);


        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }
        if (validate_title && validate_content) {
            //crear el objeto a guardar, el artículo
            var article = new Article();

            //asignar valores al objeto, artículo
            article.title = params.title;
            article.content = params.content;
            if (params.image ) {
                article.image = params.image;
            }else{
                article.image = null;
            }
            

            // guardar el artículo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        message: 'El artciulo no se ha guardado'
                    });
                }
                //devolver el artículo
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
    },

    getArticles: (req, res) => {
        var query = Article.find({});
        var last = req.params.last;

        if (last || last != undefined) {
            //ponemos un límite a la consulta, para que devuelva solo esa cantidad de elementos
            query.limit(5);
        }
        //Hacer un find
        //para odernar de más nuevo a más viejo -_id
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al mostrar datos'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },

    getArticle: (req, res) => {

        //recoger id de la url
        var articleId = req.params.id;

        //comprobar si existe el id de la url
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el artículo buscado'
            });
        }
        //buscar el artículo
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo buscado'
                });
            }
            //devolver el archivo json del artículo buscado
            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    update: (req, res) => {

        //recoger el id del artículo por la url
        var articleId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;

        //validar los datos
        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Find y el update. Busca por id y lo actualiza
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artículo!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdate
                });
            });

        } else {
            //Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }
    },

    delete: (req, res) => {
        // al crear un método hay que crear tb su ruta, en article.js de routes

        //Recoger el id de la url
        var articleId = req.params.id;
        // hacer un find y delete, buscar y eliminar
        //que el id sea igual al id de artículo que existe, si no existe devuelve un error (err) y si no devuelve el documento del artículo  que ha eliminado
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }
            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el artículo, posiblemente no exista'
                });
            }
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });
    },
    upload: (req, res) => {

        //condigurar el modulo de connect multiparty router/article.js, para habilitar la subida de archivos

        //recoger el fichero de la petición
        var file_name = 'Imagen no subida';
        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //conseguir el nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //* ADVERTENCIA * en linux o MAC
        //var file_split = file_path.split('/');

        //nombre del archivo
        var file_name = file_split[2];

        //extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //comprobar la extensión, solo imagenes, si es valida borrar el fichero

        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida'
                });
            })
        }
        else {
            //si todo es valido sacamos el id de la url
            var articleId = req.params.id;
            if (articleId) {
                //buscar el artículo y asignarle un nombre de imagen y actualizarlo
                Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdate) => {


                    if (err || !articleUpdate) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar imagen de artículo'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdate
                    });
                });
            }else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }

        }
    },  //fin subir archivos
    getImage: (req, res) => {
        //guardamos el fichero que nos llega por la url en una variable
        var file = req.params.image;
        //sacamos el path completo, concatenando la variable anterior
        var path_file = './upload/articles/' + file;

        //comprobar si el fichero existe
        fs.exists(path_file, (exists) => {

            if (exists) {
                //recoge la ruta y saca el fichero
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'Imagen NO encontrada!!!!'
                });
            }
        });

    },

    //BUSCADOR DE ARTÍCULOS
    search: (req, res) => {
        //recoger el string a buscar
        var searchString = req.params.search;

        //hacer un find 
        Article.find({
            "$or": [
                //cuando el searchString esté incluido en el title o el esté incluido en content, sacamos el artículo que coincida
                { 'title': { "$regex": searchString, "$options": "i" } },
                { 'content': { "$regex": searchString, "$options": "i" } }
            ]
        })
            .sort([['date', 'descending']])
            .exec((err, articles) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No se ha encontrado lo que buscas"
                    });
                }
                if (!articles || articles.length <= 0) {
                    return res.status(500).send({
                        status: 'error',
                        message: "No hay artículos para mostrar"
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            });
    },

}; //fin controlador

module.exports = controller;//exportar este controlador/objeto