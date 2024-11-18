import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Curso } from './curso';
import { delay, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService implements OnInit{

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  ngOnInit(){

  }
}
