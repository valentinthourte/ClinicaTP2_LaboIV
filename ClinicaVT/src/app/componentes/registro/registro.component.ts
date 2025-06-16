import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegistroPacientesComponent } from './registro-pacientes/registro-pacientes.component';
import { RegistroEspecialistasComponent } from './registro-especialistas/registro-especialistas.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, RegistroPacientesComponent, RegistroEspecialistasComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  protected opcionElegida: string = "";
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

  constructor() {}

  onClickOpcion(seleccion: string) {
    this.opcionElegida = seleccion;
  }
}
