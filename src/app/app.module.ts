import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importamos al archivo de rutas creado por nosotros, el app.routing.ts, donde estarán las rutas de las páginas que crearemos
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms'; //para que funcionen los formulario, cargarlo tb abajo en imports
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { AngularFileUploaderModule } from "angular-file-uploader";


import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { SliderComponent } from './componentes/slider/slider.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeComponent } from './componentes/home/home.component';
import { BlogComponent } from './componentes/blog/blog.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { PaginaComponent } from './componentes/pagina/pagina.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PeliculaComponent } from './componentes/pelicula/pelicula.component';
import { EsParPipe } from './pipes/espar.pipe';
import { ArticlesComponent } from './componentes/articles/articles.component';
import { ArticleComponent } from './componentes/article/article.component';
import { SearchComponent } from './componentes/search/search.component';
import { ArticleNewComponent } from './componentes/article-new/article-new.component';
import { ArticleEditComponent } from './componentes/article-edit/article-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    FormularioComponent,
    PaginaComponent,
    PeliculasComponent,
    ErrorComponent,
    PeliculaComponent,
    EsParPipe,
    ArticlesComponent,
    ArticleComponent,
    SearchComponent,
    ArticleNewComponent,
    ArticleEditComponent
  ],
  imports: [
    BrowserModule,
    //cargar los modulos de las paginas creadas por nosotros, las variables constantes
    routing,
    FormsModule, //cargar aqui tb para q funcionen los formularios
    HttpClientModule,
    MomentModule,
    AngularFileUploaderModule,

  ],//luego como servicio hay que cargar el approutingproviders
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
