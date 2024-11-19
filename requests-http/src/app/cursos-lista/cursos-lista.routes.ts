import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoResolverGuard } from './guards/curso-resolver.guard';

export const CURSOS_LISTA_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cursos-lista.component').then((c) => c.CursosListaComponent),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./cursos-form/cursos-form.component').then(
        (c) => c.CursosFormComponent
      ),
    resolve: {
      curso: CursoResolverGuard,
    },
  },

  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./cursos-form/cursos-form.component').then(
        (c) => c.CursosFormComponent
      ),
    resolve: {
      curso: CursoResolverGuard,
    },
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(CURSOS_LISTA_ROUTE);
