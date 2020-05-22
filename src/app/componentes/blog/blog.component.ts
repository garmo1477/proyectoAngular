import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from 'src/app/models/article';
import { Global } from '../../services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService],
})
export class BlogComponent implements OnInit {

  public articles: Article[];
  public url: string;

  constructor(
    private _article_service: ArticleService
  ) {
    this.url = Global.url
  }

  ngOnInit(){
   this._article_service.getArticles().subscribe(
     response =>{
        if(response.articles){
            this.articles = response.articles;
            
        }
     },
     error =>{
       console.log(error);
     }
   );
  }

}
