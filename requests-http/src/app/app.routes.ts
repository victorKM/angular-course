import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cursos'},
  {
    path: 'cursos',
    loadChildren: () => import('./cursos-lista/cursos-lista.routes').then((r) => r.CURSOS_LISTA_ROUTE),
  },
  {
    path: 'rxjs-poc',
    loadComponent: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.component').then(c => c.UnsubscribeRxjsComponent)
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
