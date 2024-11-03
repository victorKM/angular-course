import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(){

  }

  fazerLogin() {
    this.authService.fazerLogin(this.usuario);
  }

}
