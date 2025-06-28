import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Paciente } from '../../models/paciente';
import { AbstractControl, FormArray } from '@angular/forms';
import { Especialista } from '../../models/especialista';
import { TABLA_ESPECIALISTAS, TABLA_PACIENTES } from '../../constantes';
import { Especialidad } from '../../models/especialidad';
import { User } from '@supabase/supabase-js';
import { Horario } from '../../models/horario';

const CLAVE_USUARIO_SESION = "usuario";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  usuarioLogueado?: User | null = undefined;
  
  constructor(private supabaseService: SupabaseService) { }
  
  async registrarse(email: any, password: any, rol: string) {
    let {data, error} = await this.supabaseService.registrarse(email, password, rol);
    if (error)
      throw new Error(`Error al registrarse: ${error.message}`);
    this.usuarioLogueado = data.user;
    await this.supabaseService.registrarLogin(data.user!);
    return data;
  }
  
  async getUsuarioLogueadoSupabase() {
    const {data, error} = await this.supabaseService.obtenerUsuarioLogueado();
    if (error)
      throw new Error(`Error al obtener usuario logueado de supabase: ${error.message}`);
    return data.user;
  }
  async obtenerRolUsuario() {
    return (await this.getUsuarioLogueadoSupabase()).user_metadata['displayName'];
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
    this.usuarioLogueado = undefined;
    sessionStorage.removeItem(CLAVE_USUARIO_SESION);
  }
  
  guardarUsuarioLogueado(usuario: any) {
    sessionStorage.setItem(CLAVE_USUARIO_SESION, JSON.stringify(usuario));
  }
  
  async login(email: any, password: any) {
    const {data, error} = await this.supabaseService.login(email, password);
    if (error)
      throw new Error(`Error en login: ${error.message}`)
    this.usuarioLogueado = data.user;
    await this.supabaseService.registrarLogin(data.user);
    return data;
  }
  
  async guardarPaciente(paciente: Paciente, imagenes: FormArray<any>) {
    
    const archivos: File[] = imagenes.controls.map(control => control.value);
    paciente.urlImagenUno = this.getUrlPublica(await this.supabaseService.guardarImagen(paciente.dni, archivos[0]));
    paciente.urlImagenDos = this.getUrlPublica(await this.supabaseService.guardarImagen(paciente.dni, archivos[1]));
    
    await this.supabaseService.insertar(paciente, TABLA_PACIENTES);
  }
  
  
  async registrarEspecialista(especialista: Especialista, imagen: any, especialidadesIds: string[], horarios: Horario[]) {
    const archivo: File = imagen as File;
    especialista.urlImagen = this.getUrlPublica(
      await this.supabaseService.guardarImagen(especialista.dni, archivo)
    );
  
    const especialistaInsertado = await this.supabaseService.insertar(especialista, TABLA_ESPECIALISTAS);
    await this.supabaseService.setearHorariosEspecialista(especialista, horarios);
  
    
    const relaciones = especialidadesIds.map((especialidadId: string) => ({
      especialistaId: especialistaInsertado.id,
      especialidadId: especialidadId
    }));
  
    await this.supabaseService.insertarMultiples(relaciones, 'especialistas_especialidades');
  }

  async crearAdministrador(admin: any, imagen: any, password: any) {
    const archivo: File = imagen as File;
    admin.imagen = this.getUrlPublica(await this.supabaseService.guardarImagen(admin.dni, archivo));

    return await SupabaseService.crearAdministrador(admin, password);
  }
  
  async obtenerEspecialista(email: string | undefined): Promise<Especialista | undefined> {
    let especialista = await this.supabaseService.obtenerEspecialistaPorEmail(email);
    return especialista;
  }

  getUrlPublica(nombreImagen: string): string {
    return `https://ciolyhwwleeuwtoussjm.supabase.co/storage/v1/object/public/${nombreImagen}`;
  }
}
