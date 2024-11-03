import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  standalone: true,
  imports: [],
  providers: [AlunosService],
  templateUrl: './aluno-detalhe.component.html',
  styleUrl: './aluno-detalhe.component.scss'
})
export class AlunoDetalheComponent implements OnInit{

  id: number;
  aluno: any;
  inscricao: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunosService: AlunosService,
    private router: Router
  ) {

  }

  ngOnInit(){
    // this.inscricao = this.activatedRoute.params.subscribe(
    //   params => {
    //     this.id = params['id'];
    //     this.aluno = this.alunosService.getAluno(this.id);
    //   }
    // );

    this.inscricao = this.activatedRoute.data.subscribe(
      info => {
        this.aluno = info['aluno'];
      }
    );

  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  editarAluno() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

}
