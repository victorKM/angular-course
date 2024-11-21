import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'busca-reativa' },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos-lista/cursos-lista.routes').then(
        (r) => r.CURSOS_LISTA_ROUTE
      ),
  },
  {
    path: 'rxjs-poc',
    loadComponent: () =>
      import('./unsubscribe-rxjs/unsubscribe-rxjs.component').then(
        (c) => c.UnsubscribeRxjsComponent
      ),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./upload-file/upload-file.routes').then(
        (r) => r.UPLOAD_FILE_ROUTE
      ),
  },
  {
    path: 'busca-reativa',
    loadChildren: () =>
      import('./reactive-search/reactive-search.routes').then(
        (r) => r.REACTIVE_SEARCH_ROUTE
      ),
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(routes);
