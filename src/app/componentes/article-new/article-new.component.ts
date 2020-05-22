import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Global } from "../../services/global";
import swal from 'sweetalert';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService],
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;
  public is_edit: boolean;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      //url de nuestra API
      url: Global.url + 'upload-image/'    
    },
    //formulario clasico el attachPin
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube una imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    //servicios que usaremos
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService,
  ) {
    this.article = new Article('', '', '', null, null);
    this.page_title = 'Crear articulo';
    this.is_edit = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this._articleService.createArticle(this.article).subscribe(
      //recoger los datos que nos llegue si todo es correcto
      response => {
        //si la respuesta llega correctamente
        if (response.status == 'success') {
          this.status = 'success';
          //le damos valor a la propiedad de articulos
          this.article = response.article;

          //CREAMOS UNA ALERTA
          swal(
            'Articulo creado',
            'El articulo se ha creado correctamente',
            'success'
          );

          this._router.navigateByUrl('/blog');
        } else {
          this.status = 'error';
        }

      },
      //recoger los datos si hay un error
      error => {
        console.log(error);
        //el estatus de la petición
        this.status = 'error';
      }
    );
  }

  imageUpload(data){
    //formpatea lo que llega en objeto JSON
    let image_data = JSON.parse(data.response);

    //subimos el archivo regogemos el nombre del mismo adjuntarlo dentro del objeto del articulo, clavarlo en la propiedad "image" y así guardamos la imagen como tal, vinculando la imagen subida al articulo creado
    this.article.image = image_data.image;
  }

}
