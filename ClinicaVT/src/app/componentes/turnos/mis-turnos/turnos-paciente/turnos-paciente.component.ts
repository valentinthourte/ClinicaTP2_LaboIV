import { Component } from '@angular/core';
import { Turno } from '../../../../models/turno';
import { Especialista } from '../../../../models/especialista';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnos-paciente',
  imports: [CommonModule, FormsModule],
  templateUrl: './turnos-paciente.component.html',
  styleUrl: './turnos-paciente.component.scss'
})
export class TurnosPacienteComponent {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  filtro: string = '';
  listaDeEspecialistas: Especialista[] = [];
  
  filtrarTurnos() {
    const filtroLower = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.especialidad.toLowerCase().includes(filtroLower) ||
      this.obtenerNombreEspecialista(t.especialistaId).toLowerCase().includes(filtroLower)
    );
  }
  
  obtenerNombreEspecialista(id: string): string {
    const esp = this.listaDeEspecialistas.find(e => e.id === id);
    return esp ? `${esp.nombre} ${esp.apellido}` : 'Desconocido';
  }

  calificarAtencion(_t18: any) {
    throw new Error('Method not implemented.');
  }

  completarEncuesta(_t18: any) {
    throw new Error('Method not implemented.');
  }

  cancelarTurno(_t18: any) {
    throw new Error('Method not implemented.');
  }

  verResenia(_t22: Turno) {
    throw new Error('Method not implemented.');
  }
}
