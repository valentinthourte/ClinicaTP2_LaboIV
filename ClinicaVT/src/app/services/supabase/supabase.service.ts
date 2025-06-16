import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  constructor() { }

  async registrarse(email: any, password: any,rol: string) {
    return await this.supabase.auth.signUp({
      email: email, 
      password: password,
      options: {
        data: {
          displayName: rol
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
    console.log(objeto);
    
    await this.supabase.from(tabla)
    .insert(objeto)
    .then(({data, error}) => {
      if (error) {
        console.log(error);
        throw new Error(error?.message);
      }
      else
        return data; 
    })
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
  
}
