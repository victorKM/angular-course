import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrl: './meu-form.component.css'
})
export class MeuFormComponent {

  nome: string = 'abc';

  pessoa: any = {
    nome: 'def',
    idade: 20
  }

}
