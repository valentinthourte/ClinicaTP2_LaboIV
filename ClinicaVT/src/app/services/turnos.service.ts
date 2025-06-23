import { Injectable } from '@angular/core';
import { Turno } from '../models/turno';
import { SupabaseService } from './supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  
  constructor(private supabaseService: SupabaseService) { }
  
  async obtenerTurnosPacientePorId(id: string | undefined): Promise<Turno[]> {
    return this.supabaseService.obtenerTurnosDePaciente(id);
  }

  
}
