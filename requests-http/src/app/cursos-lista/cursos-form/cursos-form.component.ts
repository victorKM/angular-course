import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ErrorMsgComponent],
  providers: [AlertModalService, BsModalService],
  templateUrl: './cursos-form.component.html',
  styleUrl: './cursos-form.component.scss',
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cursoService: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   console.log(id);
    //   const curso$ = this.cursoService.loadById(id);
    //   curso$.subscribe((curso) => {
    //     this.updateForm(curso);
    //   });
    // });

    //route.params n precisa unsubscribe, pois o angular neste caso cuida disso

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap((id) => this.cursoService.loadById(id))
    //   )
    //   .subscribe((curso: any) => this.updateForm(curso));

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem nao importa (mais usado)
    // exhaustMap -> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome,
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSucesso = 'Curso criado com sucesso!';
      let msgErro = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id) {
        msgSucesso = 'Curso atualizado com sucesso!';
        msgErro = 'Erro ao atualizar curso, tente novamente!';
      }

      this.cursoService.save(this.form.value).subscribe({
        next: (success) => {
          this.modal.showAlertSuccess(msgSucesso);
          setTimeout(() => {
            this.location.back();
          }, 3000);
        },
        error: (error) => this.modal.showAlertDanger(msgErro),
      });

      // if (this.form.value.id) {
      //   //update
      //   this.cursoService.update(this.form.value).subscribe({
      //     next: (success) => {
      //       this.modal.showAlertSuccess('Atualizado com sucesso');
      //       setTimeout(() => {
      //         this.location.back();
      //       }, 3000);
      //     },
      //     error: (error) =>
      //       this.modal.showAlertDanger(
      //         'Erro ao atualizar curso, tente novamente!'
      //       ),
      //     complete: () => console.log('update completo'),
      //   });
      // } else {
      //   // create
      //   this.cursoService.create(this.form.value).subscribe({
      //     next: (success) => {
      //       this.modal.showAlertSuccess('Criado com sucesso');
      //       setTimeout(() => {
      //         this.location.back();
      //       }, 3000);
      //     },
      //     error: (error) =>
      //       this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
      //     complete: () => console.log('request completo'),
      //   });
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //console.log('onCancel');
  }
}
