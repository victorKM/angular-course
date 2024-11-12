import { Routes } from '@angular/router';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';

export const routes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent},
  { path: 'dataForm', component: DataFormComponent},
  { path: '', pathMatch: 'full', redirectTo: 'dataForm'}
];
