import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/cursos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receber-curso-criado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receber-curso-criado.component.html',
  styleUrl: './receber-curso-criado.component.scss'
})
export class ReceberCursoCriadoComponent implements OnInit{

  curso: string = "";

  constructor(private _cursosService: CursosService) {

  }

  ngOnInit() {
    this._cursosService.emitirCursoCriado.subscribe(
      cursoCriado => this.curso = cursoCriado
    );
  }

}
