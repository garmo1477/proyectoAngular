import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//para poder recibir parametros por la url
@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
//cargamos los servicios de arriba aqui en el constructor para recibir los parametros por la url, son objetos de router. los pasamos como parametros del constructor
public nombre: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
    ){}

  ngOnInit(){
    //pasar los parametros de la url
    this._route.params.subscribe((params: Params)=>{
      this.nombre = params.nombre;
    });

  }
  redireccion(){
    //Para hacer redicciones en angular
    this._router.navigate(['/pagina-pruebas', 'Paloma']);
  }

}
