import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngstyle',
  templateUrl: './diretiva-ngstyle.component.html',
  styleUrl: './diretiva-ngstyle.component.scss'
})
export class DiretivaNgstyleComponent {

  ativo: boolean = true;
  tamanhoFonte: number = 25;

  mudarAtivo() {
    this.ativo = !this.ativo;
  }
 }
