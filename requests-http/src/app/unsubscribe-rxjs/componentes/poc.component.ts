import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { tap } from 'rxjs';


@Component({
  selector: 'app-poc',
  standalone: true,
  imports: [PocBaseComponent],
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy {
  nome = 'Componente sem unsubscribe';
  valor: string;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruído`)
  }
}
