import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngclass',
  templateUrl: './diretiva-ngclass.component.html',
  styleUrl: './diretiva-ngclass.component.scss'
})
export class DiretivaNgclassComponent {

  meuFavorito: boolean = false;

  favoritar() {
    this.meuFavorito = !this.meuFavorito;
  }

}
