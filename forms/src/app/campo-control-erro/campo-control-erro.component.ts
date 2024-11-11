import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campo-control-erro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campo-control-erro.component.html',
  styleUrl: './campo-control-erro.component.scss'
})
export class CampoControlErroComponent {

  @Input() mostrarErro: boolean;
  @Input() msgErro: string;

}
