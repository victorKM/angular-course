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

  onSubmit(formulario: any) {
    console.log(formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .pipe(map(response => response))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  consultarCEP(cep: any, form: any) {
    //Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if(cep != "") {
      var validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)) {

        this.resetaDadosForm(form);

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .pipe(map((response: any) => response))
        .subscribe(response => this.populaDadosForm(response, form));
      }
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: "",
    //     complemento: "",
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf,
    //   }
    // });

    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: "Casa",
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    });
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    });
  }

}
