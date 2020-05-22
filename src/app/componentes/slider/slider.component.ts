import { Component, OnInit, Input } from '@angular/core';
//cargamos el Input en import para usarlo más abajo
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  //propiedad input, para pasar datos de un componente padre a un hijo
  @Input() nombre: string;
  @Input() size: string;

  constructor() { }

  ngOnInit(): void {
  }

}
