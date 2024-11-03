import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent implements OnInit{

  aluno: any = {}
  inscricao: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunosService: AlunosService,
    private location: Location
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

}
