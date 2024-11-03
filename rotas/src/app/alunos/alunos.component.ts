import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AlunosService],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class AlunosComponent implements OnInit{

  alunos: any[] = [];

  constructor(
    private alunosService: AlunosService
  ){

  }

  ngOnInit(): void {
    this.alunos = this.alunosService.getAlunos();
  }

}
