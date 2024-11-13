import { FormDebugComponent } from './../form-debug/form-debug.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
  FormDebugComponent, HttpClientModule, CampoControlErroComponent],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss'
})
export class DataFormComponent implements OnInit{

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(){

    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null,Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      })
    });

    //Validators.pattern(coloque o regex aqui em string)

  }

  onSubmit() {
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(response => response))
      .subscribe(dados => {
        console.log(dados);
        // resetar o form
        //this.formulario.reset();
        this.resetar();
      },
      (erro: any) => alert('erro'));
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: String) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  verificaValidTouched(campo: any) {
    if(!this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.controls['email'];
    if(campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }
}
