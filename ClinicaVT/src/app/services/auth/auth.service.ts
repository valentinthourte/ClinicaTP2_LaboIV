import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Paciente } from '../../models/paciente';

const CLAVE_USUARIO_SESION = "usuario";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private supabaseService: SupabaseService) { }

  async registrarse(email: any, password: any, rol: string) {
    let {data, error} = await this.supabaseService.registrarse(email, password, rol);
    return {data, error};
  }

  async getUsuarioLogueadoSupabase() {
    return await this.supabaseService.obtenerUsuarioLogueado();
  }

  usuarioEstaLogueado() {
    let usuario = this.getUsuarioLogueado();
    return usuario != null && usuario != undefined;
  }

  getUsuarioLogueado() {
    let usuario = sessionStorage.getItem(CLAVE_USUARIO_SESION);
    if (usuario)
      usuario = JSON.parse(usuario);
    return usuario;
  }

  async logout() {
    await this.supabaseService.logout();
    sessionStorage.removeItem(CLAVE_USUARIO_SESION);
  }

  guardarUsuarioLogueado(usuario: any) {
    sessionStorage.setItem(CLAVE_USUARIO_SESION, JSON.stringify(usuario));
  }

  async login(email: any, password: any) {
    return await this.supabaseService.login(email, password);
  }
}
