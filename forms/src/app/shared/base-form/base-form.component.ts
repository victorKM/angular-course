import { Component } from '@angular/core';
import { Form, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [],
  template: '<div></div>',
})
export abstract class BaseFormComponent {

  formulario: FormGroup;

  abstract submit(): any;

  onSubmit() {
    if(this.formulario.valid) {
      this.submit();
    }
    else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle?.markAsTouched();
      if(controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: any) {
    if(!this.formulario.get(campo)?.valid &&
    (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)) {
      return true;
    } else {
      return false;
    }
  }

  verificaRequired(campo: any) {
    if(this.formulario.get(campo)?.hasError('required') &&
    (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)) {
      return true;
    } else {
      return false;
    }
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.controls['email'];
    console.log(campoEmail.errors);
    if(campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: String) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }

}
