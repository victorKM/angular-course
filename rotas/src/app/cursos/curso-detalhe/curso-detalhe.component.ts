import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';


@Component({
  selector: 'app-curso-detalhe',
  standalone: true,
  imports: [],
  providers: [CursosService],
  templateUrl: './curso-detalhe.component.html',
  styleUrl: './curso-detalhe.component.scss'
})
export class CursoDetalheComponent implements OnInit{

  id: number;
  inscricao: Subscription = new Subscription();
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService,
    private router: Router,
  ) {
  }

  ngOnInit(){
    this.inscricao = this.route.params.subscribe(params => {
        this.id = params['id'];

        this.curso = this.cursoService.getCurso(this.id);

        if(this.curso == null) {
          this.router.navigate(['cursos/naoEncontrado']);
        }
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
