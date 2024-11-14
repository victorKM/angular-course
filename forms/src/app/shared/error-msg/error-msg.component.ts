import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormsModule } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss'
})
export class ErrorMsgComponent implements OnInit{

  // @Input() mostrarErro: boolean;
  // @Input() msgErro: string;

  @Input() control: FormControl;
  @Input() label: string;

  ngOnInit(){

  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      console.log(propertyName)
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
          return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
        }
    }

    return null;
  }

}
