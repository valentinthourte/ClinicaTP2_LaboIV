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

  async obtenerHorariosEspecialistaParaDia(especialista: Especialista, dia: Date): Promise<string[]> {
    const fechaStr = dia.toISOString().split('T')[0]; 
    const horariosReservados = await this.supabaseService.obtenerHorariosEspecialistaParaDia(especialista, fechaStr);

    const horariosDisponibles: string[] = [];
    const inicio = 9 * 60; // minutos desde 00:00
    const fin = 18 * 60;

    for (let minutos = inicio; minutos < fin; minutos += 30) {
      const hora = Math.floor(minutos / 60).toString().padStart(2, '0');
      const min = (minutos % 60).toString().padStart(2, '0');
      const horario = `${hora}:${min}`;

      if (!horariosReservados.includes(horario)) {
        horariosDisponibles.push(horario);
      }
    }

    return horariosDisponibles;
  }
  async cancelarTurno(turno: Turno): Promise<Turno> {
    return await this.supabaseService.cancelarTurno(turno);
  }

   async obtenerTurnosPorEspecialistaId(id: string):Promise<Turno[]> {
    return await this.supabaseService.obtenerTurnosPorEspecialistaId(id);
  }

}
