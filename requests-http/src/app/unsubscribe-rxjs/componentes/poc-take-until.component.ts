import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';

@Component({
  selector: 'app-poc-take-until',
  standalone: true,
  imports: [PocBaseComponent],
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {
  nome = 'Componente com takeUntil';
  valor: string;

  unsub$ = new Subject();

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        takeUntil(this.unsub$)
      )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    this.unsub$.next(null);
    this.unsub$.complete();
    console.log(`${this.nome} foi destruído`)
  }
}
