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
  
  //#region Pacientes
  async obtenerPacientes(): Promise<Paciente[]> {
    return await this.supabaseService.obtenerTodosPacientes();
  }
  
  async obtenerPacientePorId(id: string): Promise<Paciente | undefined> {
    return await this.supabaseService.obtenerPacientePorId(id);
  }
  //#endregion
  //#region Especialistas
  async obtenerEspecialistas(): Promise<Especialista[]> {
    return await this.supabaseService.obtenerTodosEspecialistas();
  }
  
  async aprobarEspecialista(especialista: Especialista) {
    await this.supabaseService.aprobarEspecialista(especialista);
  }
  async obtenerEspecialistaPorId(id: string) {
    return await this.supabaseService.obtenerEspecialistaPorId(id);
  }
  async rechazarEspecialista(especialista: Especialista) {
    return await this.supabaseService.rechazarEspecialista(especialista);
  }
  //#endregion
  //#region Administradores
  async obtenerAdministradores(): Promise<Administrador[]> {
    return await this.supabaseService.obtenerTodosAdministradores();
  }
  
  async crearAdministrador(admin: any, password: string) {
    return await SupabaseService.crearAdministrador(admin, password);
  }

  async obtenerAdministradorPorId(id: string) {
    return await this.supabaseService.obtenerAdministradorPorId(id);
  }
  //#endregion
  
  
  
  
}
