import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poc-unsub',
  standalone: true,
  imports: [PocBaseComponent, CommonModule],
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `
})

export class PocUnsubComponent implements OnInit, OnDestroy {
  nome = 'Componente com unsubscribe';
  valor: string;

  sub: Subscription[] = [];

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.sub.push(this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor));
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
    console.log(`${this.nome} foi destruído`)
  }
}
