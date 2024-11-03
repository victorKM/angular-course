import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './login/auth.service';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app works!';

  idCurso: string = "";

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    )
  }
}
