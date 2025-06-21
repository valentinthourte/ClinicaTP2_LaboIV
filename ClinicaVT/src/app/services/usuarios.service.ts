import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';
import { Especialista } from '../models/especialista';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private supabaseService: SupabaseService) { }

  async obtenerEspecialistas(): Promise<Especialista[]> {
    return await this.supabaseService.obtenerTodosEspecialistas();
  }

  async aprobarEspecialista(especialista: Especialista) {
    await this.supabaseService.aprobarEspecialista(especialista);
  }

  async crearAdministrador(admin: any) {
    return await this.supabaseService.crearAdministrador();
  }
}
