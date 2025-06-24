import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { UsuariosService } from '../../../../services/usuarios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccion-paciente',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './seleccion-paciente.component.html',
  styleUrl: './seleccion-paciente.component.scss'
})
export class SeleccionPacienteComponent {
  @Output() pacienteSeleccionado = new EventEmitter<Paciente>();

  pacientes: Paciente[] = [];

  constructor(private usuariosService: UsuariosService) {}

  async ngOnInit() {
    this.pacientes = await this.usuariosService.obtenerPacientes();
  }

  seleccionar(paciente: Paciente) {
    this.pacienteSeleccionado.emit(paciente);
  }
}
