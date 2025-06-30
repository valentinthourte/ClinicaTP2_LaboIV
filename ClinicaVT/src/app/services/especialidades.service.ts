import { Injectable } from '@angular/core';
import { Especialidad } from '../models/especialidad';
import { SupabaseService } from './supabase/supabase.service';
import { TABLA_ESPECIALIDADES, TABLA_ESPECIALISTAS } from '../constantes';
import { EspecialidadEspecialista } from '../models/especialidad-especialista';
import { Especialista } from '../models/especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {


  
  constructor(private supabaseService: SupabaseService) { }

  async crearEspecialidad(nueva: string): Promise<Especialidad> {
    return await this.supabaseService.insertar({especialidad: nueva}, TABLA_ESPECIALIDADES)
  }

  async obtenerEspecialidades(): Promise<Especialidad[]> {
    return await this.supabaseService.obtenerTodasEspecialidades(); 
  }

  formatearEspecialidades(especialidades: Especialidad[]): string {
    if (especialidades === null || especialidades.length === 0)
      return "Sin especialidades";
    return especialidades.map(e => e.especialidad).join(', ');
  }

  async actualizarDuracionEspecialidadEspecialista(usuario: Especialista, especialidad: EspecialidadEspecialista) {
    return await this.supabaseService.actualizarDuracionEspecialidadEspecialista(usuario, especialidad);
  }
}
