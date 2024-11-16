import { ErrorMsgComponent } from './../shared/error-msg/error-msg.component';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormDebugComponent } from './../form-debug/form-debug.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { EMPTY, empty, Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { InputFieldComponent } from '../shared/input-field/input-field.component';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
  FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent,
  InputFieldComponent],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss'
})
export class DataFormComponent extends BaseFormComponent implements OnInit{

  //formulario: FormGroup;
  estados: EstadoBr[];
  cidades: Cidade[];
  //estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit(){

    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();

    //this.estados = this.dropDownService.getEstadosBr();
    this.dropDownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

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
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this)],
      confirmarEmail: [null, FormValidations.equalsTo('email')],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
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
      termos: [false, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('valor CEP: ', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
          : EMPTY
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(x => x.sigla === estado)),
        map((estados: any[]) => estados && estados.length > 0 ? estados[0].id : EMPTY),
        switchMap((estadoId: number) => this.dropDownService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);

    //Validators.pattern(coloque o regex aqui em string)
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    /*
    this.formBuilder.array([
      new FormControl(false), // angular
      new FormControl(false), // react
      new FormControl(false), // vue
      new FormControl(false), // sencha
    ])
    */
  }

  frameworksArrayControls() {
    return (this.formulario.get('frameworks') as FormArray).controls;
  }

  override submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v:any, i:any) => v ? this.frameworks[i] : null)
      .filter((v: any) => v !== null)
    })

    console.log(valueSubmit);

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

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }
}
