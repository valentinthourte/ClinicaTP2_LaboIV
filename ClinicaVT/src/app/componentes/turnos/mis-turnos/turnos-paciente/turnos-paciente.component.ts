import { Component, OnInit } from '@angular/core';
import { Turno } from '../../../../models/turno';
import { Especialista } from '../../../../models/especialista';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnosService } from '../../../../services/turnos.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { EspecialidadPipe } from '../../../../pipes/especialidad.pipe';
import { EspecialistaPipe } from '../../../../pipes/especialista.pipe';

@Component({
  selector: 'app-turnos-paciente',
  imports: [CommonModule, FormsModule, EspecialidadPipe, EspecialistaPipe],
  templateUrl: './turnos-paciente.component.html',
  styleUrl: './turnos-paciente.component.scss'
})
export class TurnosPacienteComponent implements OnInit {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  filtro: string = '';
  listaDeEspecialistas: Especialista[] = [];
  
  constructor(private auth: AuthService,private turnoService: TurnosService) {}

  filtrarTurnos() {
    const filtroLower = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.especialidad?.especialidad.toLowerCase().includes(filtroLower) ||
      this.obtenerNombreEspecialista(t.especialistaId).toLowerCase().includes(filtroLower)
    );
  }

  async ngOnInit() {
    const usuario = await this.auth.getUsuarioLogueadoSupabase();
    this.turnos = await this.turnoService.obtenerTurnosPacientePorId(usuario.id);
    this.turnosFiltrados = this.turnos;
    console.log(this.turnos);
    
  }

  obtenerEspecialistas() {
    let esp = this.turnos.filter(t => t.especialista !== null).map(t => t.especialista!);
    return esp;
  }


  obtenerNombreEspecialista(id: string): string {
    const esp = this.obtenerEspecialistas().find(e => e.id === id);
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
