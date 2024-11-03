import { Component } from '@angular/core';

import { CursosService } from './cursos.service';
import { CursosModule } from './cursos.module';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {

  nomePortal: string;

  cursos: string[];

  cursosService: CursosService;

  constructor(cursosService: CursosService){

    this.nomePortal = 'http://loiane.training';

    this.cursosService = cursosService;

    this.cursos = this.cursosService.getCursos();
  }

}
