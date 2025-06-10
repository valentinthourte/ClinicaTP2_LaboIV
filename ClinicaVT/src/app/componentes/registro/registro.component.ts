import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
opciones = [
    {
      titulo: 'Paciente',
      descripcion: 'Busca el profesional que necesitas y reserva un turno.',
      imagen: 'assets/paciente.png' 
    },
    {
      titulo: 'Especialista',
      descripcion: 'Gestiona tus turnos y permite que los pacientes te encuentren fácilmente.',
      imagen: 'assets/especialista.png' 
    }
  ];
}
