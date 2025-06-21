import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-vista-pacientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-pacientes.component.html',
  styleUrl: './vista-pacientes.component.scss'
})
export class VistaPacientesComponent {
  pacientes: Paciente[] = [];
}
