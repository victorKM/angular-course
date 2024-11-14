  import { CommonModule } from '@angular/common';
  import { Component, forwardRef, Input, OnInit } from '@angular/core';
  import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
  import { ErrorMsgComponent } from '../error-msg/error-msg.component';

  const INPUT_FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
  };

  @Component({
    selector: 'app-input-field',
    standalone: true,
    imports: [CommonModule, FormsModule, ErrorMsgComponent],
    providers: [INPUT_FIELD_VALUE_ACESSOR],
    templateUrl: './input-field.component.html',
    styleUrl: './input-field.component.scss'
  })
  export class InputFieldComponent implements ControlValueAccessor{

    @Input() classeCss: any;
    @Input() id: string;
    @Input() label: string;
    @Input() type = 'text';
    @Input() control: any;
    @Input() isReadOnly = false;

    private innerValue: any;

    get value() {
      return this.innerValue;
    }

    set value(v: any) {
      if (v !== this.innerValue) {
        this.innerValue = v;
        this.onChangeCb(v);
      }
    }

    onChangeCb: (_: any) => void = () => {};
    onTouchedCb: (_: any) => void = () => {};

    writeValue(v: any): void {
      this.value = v;
    }

    registerOnChange(fn: any): void {
      this.onChangeCb = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouchedCb = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
      this.isReadOnly = isDisabled;
    }
  }
