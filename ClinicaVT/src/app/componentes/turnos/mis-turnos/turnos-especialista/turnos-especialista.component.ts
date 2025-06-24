import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../../../models/turno';
import { Paciente } from '../../../../models/paciente';
import { EspecialidadPipe } from '../../../../pipes/especialidad.pipe';
import { TurnosService } from '../../../../services/turnos.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { EstadoTurnoColorDirective } from '../../../../directivas/estado-turno-color.directive';

@Component({
  selector: 'app-turnos-especialista',
  standalone: true,
  imports: [CommonModule, FormsModule, EspecialidadPipe, EstadoTurnoColorDirective],
  templateUrl: './turnos-especialista.component.html',
  styleUrl: './turnos-especialista.component.scss'
})
export class TurnosEspecialistaComponent implements OnInit {

  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  pacientes: Paciente[] = [];
  filtro: string = '';

  constructor(private turnosService: TurnosService, private auth: AuthService) {}

  async ngOnInit() {
    let especialista = await this.auth.getUsuarioLogueadoSupabase();
    this.turnos = await this.turnosService.obtenerTurnosPorEspecialistaId(especialista.id);
    this.turnosFiltrados = this.turnos;
  }

  filtrarTurnos() {
    const filtroLower = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.especialidad?.especialidad.toLowerCase().includes(filtroLower) ||
      this.obtenerNombrePaciente(t.pacienteId).toLowerCase().includes(filtroLower)
    );
  }

  obtenerPacientes() {
    let esp = this.turnos.filter(t => t.paciente !== null).map(t => t.paciente!);
    return esp;
  }


  obtenerNombrePaciente(id: string): string {
    const p = this.obtenerPacientes().find(p => p.id === id);
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
