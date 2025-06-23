import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Especialidad } from '../../models/especialidad';
import { TABLA_ADMINISTRADORES, TABLA_ESPECIALIDADES, TABLA_ESPECIALISTAS, TABLA_PACIENTES, TABLA_TURNOS } from '../../constantes';
import { NgToastService } from 'ng-angular-popup';
import { Especialista } from '../../models/especialista';
import { Paciente } from '../../models/paciente';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { Administrador } from '../../models/administrador';
import { Turno } from '../../models/turno';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  
  private supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  constructor(private toast: NgToastService) { }
  
  async registrarse(email: any, password: any,rol: string) {
    return await this.supabase.auth.signUp({
      email: email, 
      password: password,
      options: {
        data: {
          displayName: rol,
          role: rol
        }
      } 
    })
  }
  
  async guardarImagen(paciente: string, archivo: File): Promise<string> {
    debugger
    let nombreImagen = `${paciente}_${archivo.name}`;
    const { data, error } = await this.supabase.storage.from('imagenes')
    .upload(nombreImagen, archivo, {
      cacheControl: '3600',
      upsert: true
    });
    if (error)
      throw new Error(`Error al cargar imagen: ${error.message}`);
    return data?.fullPath!;
  }
  
  async insertar(objeto: any, tabla: string) {
    let {data, error} = await this.supabase.from(tabla).insert(objeto).select()
    if (error) {
      console.log(error);
      throw new Error(error?.message);
    }
    else
    return data![0]; 
}


obtenerUsuarioLogueado() {
  return this.supabase.auth.getUser();
}

async logout() {
  await this.supabase.auth.signOut();
}

async login(email: string, password: string) {
  return await this.supabase.auth.signInWithPassword({email: email, password: password});
}

async obtenerTodasEspecialidades(): Promise<Especialidad[]> {
  const {data, error} = await this.supabase.from(TABLA_ESPECIALIDADES).select("*");
  if (error) {
    console.error('Error al obtener especialidades:', error.message);
    this.toast.danger(`Error al obtener especialidades: ${error.message}`);
  }
  return data as Especialidad[];
}

async obtenerTodosEspecialistas(): Promise<Especialista[]> {
  const {data, error} = await this.supabase.from(TABLA_ESPECIALISTAS).select(`*, especialidad:especialidadId (*)`);
  if (error)
    throw new Error(`Error al obtener especialistas: ${error.message}`);
  else 
  return data as Especialista[];
}

async obtenerEspecialistaPorId(id: string) {
  return await this.obtenerUsuarioPorId(id, TABLA_ESPECIALISTAS) as Especialista;
}

async rechazarEspecialista(especialista: Especialista) {
  return await this.supabase.from(TABLA_ESPECIALISTAS).delete().eq('id', especialista.id);
}


async obtenerTodosPacientes(): Promise<Paciente[]> {
  const {data, error} = await this.supabase.from(TABLA_PACIENTES).select(`*`);
  if (error)
    throw new Error(`Error al obtener especialistas: ${error.message}`);
  else 
  return data as Paciente[];
}

async obtenerPacientePorId(id: string): Promise<any | undefined> {
  return (await this.obtenerUsuarioPorId(id, TABLA_PACIENTES)) as Paciente;
}

async obtenerUsuarioPorId(id: string, tabla: string): Promise<any | undefined> {
  const {data, error} = await this.supabase.from(tabla).select('*').eq('id', id);
  if (error)
    throw new Error(`Error al obtener paciente por id: ${error.message}`);
  let pac = data[0];
  return pac !== null ? pac : undefined;
}



async obtenerTodosAdministradores(): Promise<Administrador[]> {
  const {data, error} = await this.supabase.from(TABLA_ADMINISTRADORES).select(`*`);
  if (error)
    throw new Error(`Error al obtener administradores: ${error.message}`);
  else 
  return data as Administrador[];
}

async obtenerAdministradorPorId(id: string) {
  return await this.obtenerUsuarioPorId(id, TABLA_ADMINISTRADORES) as Administrador;
}

async obtenerEspecialistaPorEmail(email: string | undefined): Promise<Especialista | undefined> {
  const {data, error} = await this.supabase.from(TABLA_ESPECIALISTAS).select(`*, especialidad:especialidadId (*)`)
  .eq("email", email);
  if (error)
    throw new Error(`Error al obtener especialista por email: ${error.message}`);                                        
  else {
    let esp = data[0];
    return esp !== null ? esp as Especialista : undefined;
  }
}

async aprobarEspecialista(especialista: Especialista) {
  const { data, error } = await this.supabase
  .from('especialistas')
  .update({ aprobado: true })
  .eq('id', especialista.id)
  .select();
  if (error)
    throw new Error(`Error al aprobar especialista: ${error.message}`)  
}

static async crearAdministrador(admin: any, password: string) {
  const supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  
  let administrador = await SupabaseService.signUp(supabase, admin, password);
  
  admin.id = administrador.user?.id;
  
  supabase.auth.signOut();
  
  const { data, error } = await supabase.from(TABLA_ADMINISTRADORES).insert(admin).select();
  if (error)
    throw new Error(error.message);
  
  return data[0] as Administrador;
}

private static async signUp(supabase: any, admin: any, password: string) {
  let { data, error } = await supabase.auth.signUp({
    email: admin.email, 
    password: password,
    options: {
      data: {
        displayName: TipoUsuario.Administrador,
        role: TipoUsuario.Administrador
      }
    } 
  });
  
  if (error)
    throw new Error(error.message);
  return data;
}

async obtenerTurnosDePaciente(id: string | undefined): Promise<Turno[]> {
  const {data, error} = await this.supabase.from(TABLA_TURNOS).select('*')
                                  .eq('pacienteId', id);
  if (error)
    throw new Error(`Error al obtener turnos de paciente: ${error.message}`);

  return data as Turno[];                        
}

}
