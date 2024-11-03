import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService implements OnInit {

  constructor() { }

  getCursos(){
    return ['Java', 'Ext JS', 'Angular'];
  }

  ngOnInit() { }
}
