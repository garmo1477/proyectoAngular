//importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar componentes a los cuales quiero hacer una página exclusiva.
import { HomeComponent } from './componentes/home/home.component';
import { BlogComponent } from './componentes/blog/blog.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { PaginaComponent } from './componentes/pagina/pagina.component'; 
import { ErrorComponent } from './componentes/error/error.component';
import { ArticleComponent } from './componentes/article/article.component';
import { SearchComponent } from './componentes/search/search.component';
import { ArticleNewComponent } from "./componentes/article-new/article-new.component";
import { ArticleEditComponent } from "./componentes/article-edit/article-edit.component";

// definir array de rutas de las páginas anteriores
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog/articulo/:id', component: ArticleComponent},
    {path: 'blog/crear', component: ArticleNewComponent},


    //creamos la ruta para la pagina de editar
    {path: 'blog/editar/:id', component: ArticleEditComponent},



    //creamos el path para el buscados, se importa arriba el componente de Search
    {path: 'buscar/:search', component: SearchComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'peliculas', component: PeliculasComponent},
    //para pasar parametros por la url, creamos un ':nombre', y lo hacemos opcional poniendo la misma ruta pero sin el nombre 
    {path: 'pagina-pruebas', component: PaginaComponent},
    {path: 'pagina-pruebas/:nombre', component: PaginaComponent},   
     //la ruta de la pagina de error, debe ir al ultimo, porque sino no cargan las demas urls. y se pone 2 asteriscos para indicar que si una ruta no existe se cargue esta página de error
    {path: '**', component: ErrorComponent}
];

//exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
//para que este archivo funciona hay que importarlo en app.module