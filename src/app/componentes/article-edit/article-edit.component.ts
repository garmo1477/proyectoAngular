import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Global } from "../../services/global";
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService],
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
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
    this.is_edit = true;
    this.page_title = 'Editar artículo';
    this.url = Global.url;
  }
  ngOnInit() {
    this.getArticle();
  }

  onSubmit() {
    //pasamos el id del artículo a editar y mostramos los datos que ya coniene
    this._articleService.update(this.article._id, this.article).subscribe(
      //recoger los datos que nos llegue si todo es correcto
      response => {
        //si la respuesta llega correctamente
        if (response.status == 'success') {
          this.status = 'success';
          //le damos valor a la propiedad de artículos
          this.article = response.article;

          //CREAMOS UNA ALERTA para avisar que se ha editado correctamente, con la librería sweetalert
          swal(
            'artículo editado',
            'El artículo se ha editado correctamente',
            'success'
          );

          //redirigimos a la página del artículo
          this._router.navigate(['/blog/articulo', this.article._id]);
        } else {
          this.status = 'error';
        }

      },
      //recoger los datos si hay un error
      error => {
        console.log(error);
        //el estatus de la petición
        this.status = 'error';
        swal(
          'Fallo en la edición',
          'El artículo NO se ha podido editar',
          'error'
        );
      }
    );
  }

  imageUpload(data){
    //formpatea lo que llega en objeto JSON
    let image_data = JSON.parse(data.response);

    //subimos el archivo regogemos el nombre del mismo adjuntarlo dentro del objeto del articulo, clavarlo en la propiedad "image" y así guardamos la imagen como tal, vinculando la imagen subida al articulo creado
    this.article.image = image_data.image;
  }

  getArticle(){
    this._route.params.subscribe(params => {
      //recoger el dato que llega por la url
      let id = params['id'];
      //usamos subscribe para llamar al observable
      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article;
          }else{
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

}
