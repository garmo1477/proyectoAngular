import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //la cadena que la persona busca en el buscador
  public searchString: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(){
  }

  goSearch(){
    //redireccionamos a la página de búsqueda junto con la cadena buscada
    this._router.navigate(['/buscar', this.searchString]);
  }

} 
