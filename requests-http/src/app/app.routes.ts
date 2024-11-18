import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cursos'},
  { path: 'cursos', loadComponent: () => import('./cursos-lista/cursos-lista.component').then((c) => c.CursosListaComponent)}
];
