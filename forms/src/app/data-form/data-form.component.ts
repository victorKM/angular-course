import { FormDebugComponent } from './../form-debug/form-debug.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
  FormDebugComponent, HttpClientModule],
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
      nome: [null],
      email: [null]
    });

  }

  onSubmit() {
    console.log(this.formulario.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(response => response))
      .subscribe(dados => console.log(dados));
  }

}
