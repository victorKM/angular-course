import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';
import { Cidade } from '../models/cidade';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<any>('assets/dados/estadosbr.json').pipe();
  }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
      .pipe(
        map((cidades: Cidade[]) => cidades.filter(x => x.estado == idEstado))
      );
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'},
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java'},
      { nome: 'javascript', desc: 'JavaScript'},
      { nome: 'php', desc: 'PHP'},
      { nome: 'ruby', desc: 'Ruby'},
    ]
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não' }
    ]
  }
}
