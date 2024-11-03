import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";

@Injectable({
  providedIn: 'root'
})
export class AlunosDeactivateGuard implements CanDeactivate<AlunoFormComponent> {

  canDeactivate(
    component: AlunoFormComponent,
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log('guarda de desativação');

    return component.podeMudarRota();
  }

}
