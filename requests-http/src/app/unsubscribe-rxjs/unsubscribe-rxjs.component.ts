import { Component, OnInit } from '@angular/core';
import { EnviarValorService } from './enviar-valor.service';
import { CommonModule } from '@angular/common';
import { PocAsyncComponent } from './componentes/poc-async.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until.component';
import { PocTakeComponent } from './componentes/poc-take.component';
import { PocUnsubComponent } from './componentes/poc-unsub.component';
import { PocComponent } from './componentes/poc.component';

@Component({
  selector: 'app-unsubscribe-rxjs',
  standalone: true,
  imports: [CommonModule, PocAsyncComponent, PocBaseComponent, PocTakeUntilComponent, PocTakeComponent, PocUnsubComponent, PocComponent],
  templateUrl: './unsubscribe-rxjs.component.html',
  styleUrl: './unsubscribe-rxjs.component.scss'
})
export class UnsubscribeRxjsComponent implements OnInit{

  mostrarComponentes = true;
  constructor(private service: EnviarValorService) { }

  ngOnInit() {

  }

  emitirValor(valor: string) {
    this.service.emitirValor(valor);
  }

  destruirComponentes() {
    this.mostrarComponentes = !this.mostrarComponentes;
  }
}
