import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Paciente } from '../../models/paciente';
import { FormArray } from '@angular/forms';
import { Especialista } from '../../models/especialista';
import { TABLA_ESPECIALISTAS, TABLA_PACIENTES } from '../../constantes';

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

  async guardarPaciente(paciente: Paciente, imagenes: FormArray<any>) {
    
    const archivos: File[] = imagenes.controls.map(control => control.value);
    paciente.urlImagenUno = await this.supabaseService.guardarImagen(paciente.dni, archivos[0]);
    paciente.urlImagenDos = await this.supabaseService.guardarImagen(paciente.dni, archivos[1]);

    await this.supabaseService.insertar(paciente, TABLA_PACIENTES);
  }

  async registrarEspecialista(especialista: Especialista, imagen: any) {
    
    const archivo: File = imagen as File;
    especialista.urlImagen = await this.supabaseService.guardarImagen(especialista.dni, archivo);

    await this.supabaseService.insertar(especialista, TABLA_ESPECIALISTAS);
  }

  async obtenerEspecialista(email: string | undefined): Promise<Especialista | undefined> {
    let especialista = await this.supabaseService.obtenerEspecialistaPorEmail(email);
    return especialista;
  }
}
