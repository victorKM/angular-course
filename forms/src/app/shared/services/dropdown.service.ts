import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<any>('assets/dados/estadosbr.json').pipe();
  }
}
