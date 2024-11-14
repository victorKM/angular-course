import { FormDebugComponent } from './../form-debug/form-debug.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
  FormDebugComponent, CampoControlErroComponent],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss'
})
export class DataFormComponent implements OnInit{

  formulario: FormGroup;
  //estados: EstadoBr[];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit(){

    this.estados = this.dropDownService.getEstadosBr();

    this.cargos = this.dropDownService.getCargos();

    this.tecnologias = this.dropDownService.getTecnologias();

    this.newsletterOp = this.dropDownService.getNewsletter();

    /*this.dropDownService.getEstadosBr()
      .subscribe((res: EstadoBr[]) => {
        this.estados = res;
        console.log(res);
      });*/

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
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [false, Validators.pattern('true')]
    });

    //Validators.pattern(coloque o regex aqui em string)

  }

  onSubmit() {
    console.log(this.formulario);

    if(this.formulario.valid) {
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
    else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsTouched();
      if(controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
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
    if(!this.formulario.get(campo)?.valid &&
    (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)) {
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

  consultarCEP() {
    let cep = this.formulario.get('endereco.cep')?.value;

    //Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, '');

    if(cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        ?.subscribe(response => this.populaDadosForm(response));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: "Casa",
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    });

    //this.formulario.get('nome').setValue('Loiane');
  }

  resetaDadosForm() {
    this.formulario.patchValue({
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

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }
}
