import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { FormValidations } from '../form-validation';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
})
export class ErrorMsgComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() showMsg: boolean;

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.showMsg) {
        return FormValidations.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
