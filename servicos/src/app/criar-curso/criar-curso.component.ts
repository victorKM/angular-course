import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';
import { CommonModule } from '@angular/common';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

@Component({
  selector: 'app-criar-curso',
  standalone: true,
  imports: [CommonModule, ReceberCursoCriadoComponent],
  providers: [CursosService],
  templateUrl: './criar-curso.component.html',
  styleUrl: './criar-curso.component.scss'
})
export class CriarCursoComponent implements OnInit{

  cursos: string[] = [];

  constructor(private _cursosService: CursosService){

  }

  ngOnInit(){
    this.cursos = this._cursosService.getCursos();
  }

  onAddCurso(novoCurso: string) {
    this._cursosService.addCurso(novoCurso);
  }

}
