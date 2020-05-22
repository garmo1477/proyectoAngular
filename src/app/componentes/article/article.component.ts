import { Component, OnInit } from '@angular/core';

//cargamos todo lo relacionado al router para recoger parametros por la url
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ArticleService } from '../../services/article.service';
import { Article } from "../../models/article";
import { Global } from "../../services/global";
import swal from 'sweetalert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService],
})
export class ArticleComponent implements OnInit {
  //crear objeto de tipo article (que será una propiedad)
  public article: Article;
  public url: string;
  
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router,

  ) {
    this.url = Global.url;
  }

  ngOnInit() {

    this._route.params.subscribe(params => {
      //recoger el dato que llega por la url
      let id = params['id'];
      //usamos subscribe para llamar al observable
      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });

  }

  delete(id) {

    swal({
      title: "¿Estás seguro/a?",
      text: "Una vez borrado el artículo no podrás recuperarlo",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          //eliminamos el artículo con el id correspondiente
          this._articleService.delete(id).subscribe(

            //y si no hay error redireccionamos
            response => {
              swal("El artículo ha sido borrado correctamente", {
                icon: "success",
              });
              this._router.navigate(['/blog']);
            },
            //si hay error, pasamos por console log el mismo y luego redirigimos
            error => {
              console.log(error);
              this._router.navigate(['/blog']);
            }
          );

        } else {
          swal("No se ha borrado el artículo");
        }
      });
  }

}
