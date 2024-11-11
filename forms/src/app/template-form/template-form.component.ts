import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss'
})
export class TemplateFormComponent {

  usuario: any = {
    nome: "Victor",
    email: "victor@gmail.com"
  }

  onSubmit(form: any) {
    console.log(form.value);

    console.log(this.usuario);

  }

}
