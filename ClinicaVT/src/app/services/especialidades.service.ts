import { Injectable } from '@angular/core';
import { Especialidad } from '../models/especialidad';
import { SupabaseService } from './supabase/supabase.service';
import { TABLA_ESPECIALIDADES, TABLA_ESPECIALISTAS } from '../constantes';

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
}
