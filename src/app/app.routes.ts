import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HeroComponent } from './hero/hero.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HeroComponent,
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: MainComponent },
];
