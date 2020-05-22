import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//para recoger los datos que nos devuelve el API REST
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Global } from './global';

@Injectable()
export class ArticleService{

    public url: string;
    //cargar el http client para hacer peticiones ajax
    constructor(private _http: HttpClient){
        this.url = Global.url;
    }
    pruebas(){
        return "Soy el servicio de articulos";
    }

    getArticles(last:any = null):Observable<any>{

        var articles = 'articles';

        if(last != null){
            articles = 'articles/true';
        }
        
        return this._http.get(this.url+articles);
    }

    getArticle(articleId):Observable<any>{
        //petición AJAX al backend
        return this._http.get(this.url+'article/'+articleId);
    }

    //creamos un método nuevo para el buscador de la web, y le pasamos un parametro para que haga la busqueda.
    //luego tenemos que crear la ruta en app.routing. En Backend, en routes, ya habiamos creado una ruta en article.js
    search(searchString):Observable<any>{
        return this._http.get(this.url+'search/'+searchString);
    }

    //creamos un método para guardar los datos del formulario de crear articulos
    createArticle(article):Observable<any>{
        //convertir el objeto en un string, para poder enviarlo por http, al backend del API REST
        let params = JSON.stringify(article);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'save',params, {headers: headers});
    }

    //método para actualizar un articulo
    update(id, article):Observable<any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-type','application/json');
        return this._http.put(this.url+'article/'+id, params, {headers:headers});
    }

    //método para eliminar un articulo
    delete(id):Observable<any>{

        let headers =  new HttpHeaders().set('Content-type','application/json');

        return this._http.delete(this.url+'article/'+id, {headers:headers});

    }
}