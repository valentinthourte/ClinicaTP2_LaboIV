import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { AbstractControl, FormArray } from '@angular/forms';
import { Paciente } from '../../models/paciente';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private supabaseService: SupabaseService, private auth: AuthService) { }

  async registrarse(email: any, password: any, rol: string) {
    return await this.auth.registrarse(email, password, rol);
  }

  async guardarPaciente(paciente: Paciente, imagenes: FormArray<any>) {
    const TABLA_PACIENTES = "pacientes";
    const archivos: File[] = imagenes.controls.map(control => control.value);
    paciente.urlImagenUno = await this.supabaseService.guardarImagen(paciente.dni, archivos[0]);
    paciente.urlImagenDos = await this.supabaseService.guardarImagen(paciente.dni, archivos[1]);

    await this.supabaseService.insertar(paciente, TABLA_PACIENTES);
    this.auth.guardarUsuarioLogueado(paciente);
  }
}
