import { Component } from '@angular/core';

@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrl: './diretivas-customizadas.component.scss'
})
export class DiretivasCustomizadasComponent {

  mostrarCursos: boolean = true;

  onMostrarCursos() {
    this.mostrarCursos = !this.mostrarCursos;
  }
}
