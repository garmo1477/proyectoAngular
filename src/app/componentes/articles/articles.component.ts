import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article';
//hay que importar el servicios global, para utilizar la propiedad url en el blog para las imágenes
import { Global } from '../../services/global';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
//aqui declaramos una variable para la url de las imagenes del blog
  public url: string; 

  @Input() articles: Article[];
  constructor() { 
     //y aqui le asignamos el valor de la propiedad url de Global
    this.url = Global.url;
   
  }

  ngOnInit(){
    console.log(this.articles);
  }

}
