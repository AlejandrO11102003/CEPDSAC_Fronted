import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './pages/slider/slider.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { DiplomadosComponent } from './pages/diplomados/diplomados.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
import { TestimoniosComponent } from './pages/testimonios/testimonios.component';

@Component({
  selector: 'app-hero',
  imports: [
    SliderComponent,
    CursosComponent,
    DiplomadosComponent,
    NosotrosComponent,
    EstadisticasComponent,
    SponsorsComponent,
    TestimoniosComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
