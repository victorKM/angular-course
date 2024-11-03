import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursosComponent } from "./cursos/cursos.component";
import { CriarCursoComponent } from "./criar-curso/criar-curso.component";
import { LogService } from './shared/log.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CursosComponent, CriarCursoComponent],
  providers: [LogService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'servicos';
}
