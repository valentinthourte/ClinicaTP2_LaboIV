import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { Administrador } from '../models/administrador';

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
  
  async obtenerAdministradores(): Promise<Administrador[]> {
    return await this.supabaseService.obtenerTodosAdministradores();
  }
  async aprobarEspecialista(especialista: Especialista) {
    await this.supabaseService.aprobarEspecialista(especialista);
  }
  
  async crearAdministrador(admin: any, password: string) {
    return await SupabaseService.crearAdministrador(admin, password);
  }
}
