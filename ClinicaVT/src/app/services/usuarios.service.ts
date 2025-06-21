import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private supabaseService: SupabaseService) { }

  async obtenerEspecialistas(): Promise<Especialista[]> {
    return await this.supabaseService.obtenerTodosEspecialistas();
  }

  async obtenerPacientes(): Promise<Paciente[]> {
    return await this.supabaseService.obtenerTodosPacientes();
  }

  async aprobarEspecialista(especialista: Especialista) {
    await this.supabaseService.aprobarEspecialista(especialista);
  }

  async crearAdministrador(admin: any) {
    
  }
}
