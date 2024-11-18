import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursosService } from './cursos.service';
import { Curso } from './curso';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ModalModule],
  providers: [BsModalService],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.scss',
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit{

  //cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef?: BsModalRef;

  constructor(
    private service: CursosService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
      // this.service.list()
      // .subscribe(dados => this.cursos = dados);

      this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          this.handleError();
          return EMPTY;
        })
      );

    this.service.list()
      .pipe(
        catchError(error => EMPTY)
      )
      .subscribe({
      next: dados => {
        console.log(dados)
      },
      // error: error => console.error(error),
      // complete: () => console.log('Observable completo!')
    });
  }

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
