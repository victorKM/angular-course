import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  providers: [CursosService],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit{

  cursos: any[] = [];
  pagina: number;
  inscricao: Subscription

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(){
    this.cursos = this.cursosService.getCursos();

    this.inscricao = this.route.queryParams.subscribe(queryParams => {
      this.pagina = queryParams['pagina'];
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  proximaPagina() {
    this.router.navigate(['/cursos'],
      {queryParams: {'pagina': ++this.pagina}}
    )
  }

}
