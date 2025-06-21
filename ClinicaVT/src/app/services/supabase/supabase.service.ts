import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Especialidad } from '../../models/especialidad';
import { TABLA_ESPECIALIDADES, TABLA_ESPECIALISTAS } from '../../constantes';
import { NgToastService } from 'ng-angular-popup';
import { Especialista } from '../../models/especialista';

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
    let nombreImagen = `${paciente}_${archivo.name}`;
    const { data, error } = await this.supabase.storage.from('imagenes')
      .upload(nombreImagen, archivo, {
      cacheControl: '3600',
      upsert: true
    });
    if (error)
      throw new Error(`Error al cargar imagen: ${error.message}`);
    
    return data?.path!;
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

  
}
