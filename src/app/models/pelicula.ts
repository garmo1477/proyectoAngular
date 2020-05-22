//para usar la clase fuera de este archivo, se usa export
export class Pelicula{
    /*public title: string;
    public image: string;   
    public year: number;
    
    constructor(title, image, year){
        this.title = title;
        this.image = image;
        this.year = year;
    } Es una manera de hacer. Pero la mejor es la siguiente*/

    constructor(
        public title: string,
        public image: string,   
        public year: number)
    {}
}