//un modelo es una clase que nos da un molde para un objeto
'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now } ,
    image: String
});

module.exports = mongoose.model('Article', ArticleSchema);
//crea una colección q se llamara articles donde guarda documentos de este tipo y con estructura dentro de la colección