import { CanActivateChild } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cursos', loadComponent: () => import('./cursos/cursos.component').then((c) => c.CursosComponent), children: [
    { path: 'naoEncontrado', loadComponent: () => import('./cursos/curso-nao-encontrado/curso-nao-encontrado.component').then((c) => c.CursoNaoEncontradoComponent)},
    { path: ':id', loadComponent: () => import('./cursos/curso-detalhe/curso-detalhe.component').then((c) => c.CursoDetalheComponent)},
  ], canActivate: [AuthGuard], canActivateChild: [CursosGuard]
  },
  { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
  { path: 'alunos', loadComponent: () => import('./alunos/alunos.component').then(c => c.AlunosComponent), children: [
    { path: 'novo', loadComponent: () => import('./alunos/aluno-form/aluno-form.component').then(c => c.AlunoFormComponent), canActivate: [AuthGuard] },
    { path: ':id', loadComponent: () => import('./alunos/aluno-detalhe/aluno-detalhe.component').then(c => c.AlunoDetalheComponent), canActivate: [AuthGuard] },
    { path: ':id/editar', loadComponent: () => import('./alunos/aluno-form/aluno-form.component').then(c => c.AlunoFormComponent), canActivate: [AuthGuard] },
  ], canActivate: [AuthGuard], canActivateChild: [AlunosGuard]},
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
