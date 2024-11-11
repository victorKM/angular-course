import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, CommonModule, FormDebugComponent, CampoControlErroComponent,
    HttpClientModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss'
})
export class TemplateFormComponent implements OnInit{

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  onSubmit(form: any) {
    console.log(form);
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  consultarCEP(cep: any) {
    //Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if(cep != "") {
      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)) {

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .pipe(map((response: any) => response))
        .subscribe(response => console.log(response));

      }
    }
  }

}
