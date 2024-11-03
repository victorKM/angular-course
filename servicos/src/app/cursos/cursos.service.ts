import { Injectable, EventEmitter  } from '@angular/core';
import { LogService } from '../shared/log.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  emitirCursoCriado = new EventEmitter<string>();
  static criouNovoCurso = new EventEmitter<string>();

  cursos: string[] = ["Angular 2", "Spring Boot"];

  constructor(private _logService: LogService) {
    console.log("instancia")
  }

  getCursos() {
    this._logService.consoleLog('Obtendo lista de cursos');
    return this.cursos;
  }

  addCurso(novoCurso: string) {
    this._logService.consoleLog(`Criando um novo curso: ${novoCurso}`);
    this.cursos.push(novoCurso);
    this.emitirCursoCriado.emit(novoCurso);
    CursosService.criouNovoCurso.emit(novoCurso);
  }
}
