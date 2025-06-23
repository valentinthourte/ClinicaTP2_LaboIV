import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../../../models/turno';
import { Paciente } from '../../../../models/paciente';

@Component({
  selector: 'app-turnos-especialista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turnos-especialista.component.html',
  styleUrl: './turnos-especialista.component.scss'
})
export class TurnosEspecialistaComponent {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  pacientes: Paciente[] = [];
  filtro: string = '';

  filtrarTurnos() {
    const filtroLower = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.especialidad.toLowerCase().includes(filtroLower) ||
      this.obtenerNombrePaciente(t.pacienteId).toLowerCase().includes(filtroLower)
    );
  }

  obtenerNombrePaciente(id: string): string {
    const p = this.pacientes.find(p => p.id === id);
    return p ? `${p.nombre} ${p.apellido}` : 'Desconocido';
  }

  aceptarTurno(turno: Turno) {
    console.log('Aceptar turno:', turno);
    // TODO: implementar lógica
  }

  cancelarTurno(turno: Turno) {
    console.log('Cancelar turno:', turno);
    // TODO: implementar lógica
  }

  rechazarTurno(turno: Turno) {
    console.log('Rechazar turno:', turno);
    // TODO: implementar lógica
  }

  finalizarTurno(turno: Turno) {
    console.log('Finalizar turno:', turno);
    // TODO: implementar lógica
  }

  verResenia(turno: Turno) {
    console.log('Ver reseña:', turno);
    // TODO: implementar lógica
  }
}
