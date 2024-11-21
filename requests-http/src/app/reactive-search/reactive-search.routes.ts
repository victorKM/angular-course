import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const REACTIVE_SEARCH_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reactive-search.component').then(
        (c) => c.ReactiveSearchComponent
      ),
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(
  REACTIVE_SEARCH_ROUTE
);
