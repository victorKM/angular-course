import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const UPLOAD_FILE_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./upload-file.component').then((c) => c.UploadFileComponent),
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(UPLOAD_FILE_ROUTE);
