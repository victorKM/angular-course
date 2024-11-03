import { CanActivateChild, CanMatchFn } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { AlunosDeactivateGuard } from './guards/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './alunos/guards/aluno-detalhe.resolver';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  { path: 'cursos', loadComponent: () => import('./cursos/cursos.component').then((c) => c.CursosComponent), children: [
    { path: 'naoEncontrado', loadComponent: () => import('./cursos/curso-nao-encontrado/curso-nao-encontrado.component').then((c) => c.CursoNaoEncontradoComponent)},
    { path: ':id', loadComponent: () => import('./cursos/curso-detalhe/curso-detalhe.component').then((c) => c.CursoDetalheComponent)},
  ], canActivate: [AuthGuard], canActivateChild: [CursosGuard]
  },
  { path: 'alunos', loadComponent: () => import('./alunos/alunos.component').then(c => c.AlunosComponent), children: [
    { path: 'novo', loadComponent: () => import('./alunos/aluno-form/aluno-form.component').then(c => c.AlunoFormComponent),  },
    { path: ':id', loadComponent: () => import('./alunos/aluno-detalhe/aluno-detalhe.component').then(c => c.AlunoDetalheComponent),  resolve: { aluno: AlunoDetalheResolver }},
    { path: ':id/editar', loadComponent: () => import('./alunos/aluno-form/aluno-form.component').then(c => c.AlunoFormComponent),  canDeactivate: [AlunosDeactivateGuard]},
  ], canActivate: [AuthGuard], canActivateChild: [AlunosGuard]},
  { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard]}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
