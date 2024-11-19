import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CursosService } from './cursos.service';
import { Curso } from './curso';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ModalModule],
  providers: [BsModalService, AlertModalService],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.scss',
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  //cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  // bsModalRef?: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursoSelecionado: Curso;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    // this.service.list()
    //   .pipe(
    //     catchError(error => EMPTY)
    //   )
    //   .subscribe({
    //   next: dados => {
    //     console.log(dados)
    //   },
    //   // error: error => console.error(error),
    //   // complete: () => console.log('Observable completo!')
    // });
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(cursoId: number) {
    this.router.navigate(['editar', cursoId], { relativeTo: this.route });
  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe({
      next: (success) => {
        this.alertService.showAlertSuccess('Curso removido com sucesso!');
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error: (error) => {
        this.alertService.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      },
    });
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
