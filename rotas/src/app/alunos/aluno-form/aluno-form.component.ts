import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate{

  aluno: any = {}
  inscricao: Subscription;
  private formMudou: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunosService: AlunosService,
  ){
  }

  ngOnInit() {
    this.inscricao = this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);

        if(this.aluno == null) {
          this.aluno = {};
        }
      }
    )
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  onInput() {
    this.formMudou = true;
    console.log('mudou');
  }

  podeMudarRota() {

    if(this.formMudou) {
      confirm("Tem certeza que deseja sair dessa página?");
    }

    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }

}
