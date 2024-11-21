import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-search.component.html',
  styleUrl: './reactive-search.component.scss',
})
export class ReactiveSearchComponent {
  queryField = new FormControl();

  onSearch() {
    console.log(this.queryField.value);
  }
}
