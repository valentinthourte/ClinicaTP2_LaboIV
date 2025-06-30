import { inject, Injectable } from '@angular/core';
import { Turno } from '../models/turno';
import { SupabaseService } from './supabase/supabase.service';
import { DiaHoraTurno } from '../models/dia-hora-turno';
import { Especialidad } from '../models/especialidad';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { HistoriaClinica } from '../models/historia-clinica';

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

  turnoAFilaExcel(t: Turno): any {
    const historia = t.historiaClinica;
    const adicionales = historia?.adicionales?.map(a => `${a.clave}: ${a.valor}`).join(', ') || 'Sin adicionales';

    return {
      'Fecha': t.fecha ? new Date(t.fecha).toLocaleDateString() : 'Sin fecha',
      'Hora': t.hora || 'Sin hora',
      'Estado': t.estado || 'Sin estado',
      'Especialista': t.especialista ? `${t.especialista.nombre} ${t.especialista.apellido}` : 'Sin especialista',
      'Paciente': t.paciente ? `${t.paciente.nombre} ${t.paciente.apellido}` : 'Sin paciente',
      'Especialidad': t.especialidad?.especialidad || 'Sin especialidad',
      'Comentario': t.comentario || 'Sin comentario',
      'Altura (cm)': historia?.altura ?? 'N/A',
      'Peso (kg)': historia?.peso ?? 'N/A',
      'Temperatura (°C)': historia?.temperatura ?? 'N/A',
      'Presión': historia?.presion ?? 'N/A',
      'Adicionales': adicionales
    };
  }

  turnoToArray(turno: Turno) {
    let datos = [`${this.formatearFecha(turno.fecha)}:${turno.hora}`, `${turno.especialista!.nombre} ${turno.especialista!.apellido}`, turno.especialidad?.especialidad, turno.estado];
    for (let dato of this.historiaClinicaToArray(turno.historiaClinica!))
      datos.push(dato);
    return datos;
  }

  historiaClinicaToArray(historiaClinica?: HistoriaClinica): any {
    let historia = historiaClinica ?? {altura: null, peso: null, presion: null, temperatura: null, adicionales: null};
    const datosExtras = historia.adicionales && historia.adicionales.length > 0
    ? historia.adicionales.map(a => `${a.clave}: ${a.valor}`).join(', ')
    : 'No tiene';

    return [
      historia.altura ?? 'No tiene',
      historia.peso ?? 'No tiene',
      historia.presion ?? 'No tiene',
      historia.temperatura ?? 'No tiene',
      datosExtras
    ];
  }

  obtenerEncabezadosHistorialClinico() {
    return ['Fecha', 'Especialista', 'Especialidad', 'Estado', 'Altura', 'Peso', 'Presión', 'Temperatura', 'Extras'];
  }

  formatearFecha(fecha: Date | string): string {
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  async obtenerTurnosPorEspecialistaFranjaHoraria(fechaDesde: string | undefined, fechaHasta: string | undefined, especialista: Especialista): Promise<Turno[]> {
    debugger
    if (!fechaDesde || !fechaHasta)
      throw new Error("Las fechas ingresadas no son válidas. ");
    return await this.supabaseService.obtenerTurnosPorEspecialistaFranjaHoraria(fechaDesde!, fechaHasta!, especialista);
  }

  async obtenerTurnosRealizadosPorEspecialistaFranjaHoraria(fechaDesde: string | undefined, fechaHasta: string | undefined, especialista: Especialista): Promise<Turno[]> {
    debugger
    if (!fechaDesde || !fechaHasta)
      throw new Error("Las fechas ingresadas no son válidas. ");
    return await this.supabaseService.obtenerTurnosRealizadosPorEspecialistaFranjaHoraria(fechaDesde!, fechaHasta!, especialista);
  }

}
