import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  providers: [CursosService],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit{

  cursos: string[] = [];

  constructor(private _cursoService: CursosService) {

  }

  ngOnInit(){
    this.cursos = this._cursoService.getCursos();

    CursosService.criouNovoCurso.subscribe(
      curso => this.cursos.push(curso)
    );
  }
}
