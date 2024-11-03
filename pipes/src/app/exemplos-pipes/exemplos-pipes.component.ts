import { FiltroArrayImpuroPipe } from './../filtro-array-impuro.pipe';
import { SettingsService } from './../settings.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CamelCasePipe } from '../camel-case.pipe';
import { FiltroArrayPuroPipe } from '../filtro-array-puro.pipe';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  standalone: true,
  imports: [CommonModule, CamelCasePipe, FiltroArrayPuroPipe,
            FormsModule, FiltroArrayImpuroPipe, AsyncPipe],
  templateUrl: './exemplos-pipes.component.html',
  styleUrl: './exemplos-pipes.component.scss',
  providers:[
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: SettingsService) => settingsService.getLocale()
    }
    ]
})
export class ExemplosPipesComponent implements OnInit{

  livro: any = {
    titulo: 'Learning JavaScript Data Structure and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glgjpRP'
  }

  livros: string[] = ['Java', 'Angular 2']

  filtro: string = '';

  addCurso(novoCurso: string) {
    console.log(novoCurso);
    this.livros.push(novoCurso)
    console.log(this.livros)
  }

  obterCursos() {
    if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() == '') {
      return this.livros;
    }

    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    })
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000)
  });

  valorAsync2 = new Observable<string>(observable => {
    setTimeout(() => {
      observable.next('Valor assíncrono 2');
    }, 2000);
  });

  constructor() {

  }

  ngOnInit() {

  }
}
