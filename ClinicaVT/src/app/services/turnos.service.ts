import { Injectable } from '@angular/core';
import { Turno } from '../models/turno';
import { SupabaseService } from './supabase/supabase.service';
import { DiaHoraTurno } from '../models/dia-hora-turno';
import { Especialidad } from '../models/especialidad';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private supabaseService: SupabaseService) { }
  
  async obtenerTurnosPacientePorId(id: string | undefined): Promise<Turno[]> {
    return this.supabaseService.obtenerTurnosDePaciente(id);
  }

  async crearTurno(paciente: Paciente, especialidad: Especialidad, especialista: Especialista, diaHora: DiaHoraTurno) {
    await this.supabaseService.crearTurno(paciente, especialidad, especialista, diaHora);
  }

  async obtenerHorariosEspecialistaParaDia(
    especialista: Especialista,
    dia: Date,
    especialidad: Especialidad
  ): Promise<string[]> {
    const fechaStr = dia.toISOString().split('T')[0];
    const horariosReservados = await this.supabaseService.obtenerHorariosEspecialistaParaDia(especialista, fechaStr);
    const horariosDia = especialista.horarios.find(h => h.dia === dia.getDay());
    const duracionTurnos = especialista.especialidades.find(e => e.especialidad.id === especialidad.id)?.duracion;

    if (!horariosDia || !duracionTurnos || !horariosDia.habilitado) {
      return [];
    }

    const disponibles: string[] = [];

    const [hDesde, mDesde] = horariosDia.horaDesde.split(':').map(Number);
    const [hHasta, mHasta] = horariosDia.horaHasta.split(':').map(Number);

    let minutosInicio = hDesde * 60 + mDesde;
    const minutosFin = hHasta * 60 + mHasta;

    while (minutosInicio + duracionTurnos <= minutosFin) {
      const horas = Math.floor(minutosInicio / 60);
      const minutos = minutosInicio % 60;
      const horario = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

      if (!horariosReservados.includes(horario)) {
        disponibles.push(horario);
      }

      minutosInicio += duracionTurnos;
    }

    return disponibles;
  }

  async cancelarTurno(turno: Turno): Promise<Turno> {
    return await this.supabaseService.cancelarTurno(turno);
  }
  async aceptarTurno(turno: Turno) {
    return await this.supabaseService.aceptarTurno(turno);
  }
  async rechazarTurno(turno: Turno) {
    return await this.supabaseService.rechazarTurno(turno);
  }
  async finalizarTurno(turno: Turno) {
    return await this.supabaseService.finalizarTurno(turno);
  }

  async obtenerTurnosPorEspecialistaId(id: string):Promise<Turno[]> {
    return await this.supabaseService.obtenerTurnosPorEspecialistaId(id);
  }

  async obtenerTodosTurnos(): Promise<Turno[]> {
    return await this.supabaseService.obtenerTodosTurnos();
  }

  async cargarHistoriaClinicaDeTurno(turno: Turno) {
    await this.supabaseService.cargarHistoriaClinicaDeTurno(turno);
  }

  filtrarTurnos(turnos: Turno[], filtroLower: string): Turno[] {
    return turnos.filter(t => {
      const dataStr = JSON.stringify(t).toLowerCase();
      return dataStr.includes(filtroLower);
    });
  } 

  async setearTurnoCalificado(turno: Turno, calificacion: number) {
    await this.supabaseService.setearTurnoCalificado(turno, calificacion);
  }
}
