import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursosService } from './cursos.service';
import { Curso } from './curso';

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.scss',
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit{

  cursos: Curso[];

  constructor(private service: CursosService) {}

  ngOnInit() {
      this.service.list()
      .subscribe(dados => this.cursos = dados);
  }
}
