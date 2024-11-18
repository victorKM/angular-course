import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const CURSOS_LISTA_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () => import('./cursos-lista.component').then((c) => c.CursosListaComponent),
  },
  {
    path: 'novo',
    loadComponent: () => import('./cursos-form/cursos-form.component').then((c) => c.CursosFormComponent),
  },

  {
    path: 'editar/:id',
    loadComponent: () => import('./cursos-form/cursos-form.component').then((c) => c.CursosFormComponent),
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(CURSOS_LISTA_ROUTE);
