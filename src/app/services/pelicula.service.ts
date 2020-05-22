import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()

//creamos un servicio
export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula("Harry Potter, y la piedra filosofal",'https://statics.viralizalo.com/virs/2016/02/VIR_139579_11711_harry_potter_y_la_piedra_filosofal_el_test_definitivo.jpg?cb=62372',2019),
            new Pelicula("El Señor de los Anillos, la comunidad del anillo", "https://3.bp.blogspot.com/-Z9_SOccupGU/VwUv6htiHSI/AAAAAAAAKUw/zNE2zzTYInM3Pw9fJK6B6ZSe4wmlvn_FQ/s1600/El-Se%25C3%25B1or-de-los-Anillos-La-Comunidad-del-Anillo.jpg",2005),
            new Pelicula("El Viaje de Chihiro","https://www.euribor.com.es/wp-content/uploads/2020/01/Chihiro-22-1-740x431@2x.png",2000),
            new Pelicula("Mi Vecino Totoro","https://static3.abc.es/media/play/2018/10/01/mivecinototoro-k3BD--940x705@abc.jpg", 1989)     
          ];
    }
    holaMundo(){
        return 'Hola Mundo desde el servicio de Peliculas';
    }

    getPeliculas(){
        return this.peliculas;
    }
}