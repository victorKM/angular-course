import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { FormDebugComponent } from './form-debug/form-debug.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'forms';
}
