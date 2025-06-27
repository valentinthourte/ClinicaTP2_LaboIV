import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { Administrador } from '../models/administrador';
import { Horario } from '../models/horario';

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

  async obtenerPacienteLogueado(): Promise<Paciente> {
    const { data, error } = await this.supabaseService.obtenerUsuarioLogueado();
    if (error)
      throw new Error(`Error al obtener paciente logueado. ${error.message}`);
    return await this.supabaseService.obtenerPacientePorId(data.user.id);
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
  async obtenerEspecialistasAprobadosPorEspecialidad(id: string): Promise<Especialista[]> {
    return await this.supabaseService.obtenerEspecialistasAprobadosPorEspecialidadId(id);
  }
  async setearHorariosEspecialista(especialista: Especialista, horarios: Horario[]) {
      return await this.supabaseService.setearHorariosEspecialista(especialista, horarios);
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
  
  
  async eliminarEspecialidadAEsp(usuarioId: string | undefined, especialidadId: string) {
    await this.supabaseService.eliminarEspecialidadAEsp(usuarioId, especialidadId);
  }
  async agregarEspecialidadAEsp(id: string | undefined, especialidadId: any, duracion: any) {
    await this.supabaseService.agregarEspecialidadAEsp(id, especialidadId, duracion);
  }
  
  
}
