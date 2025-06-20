import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { FormArray } from '@angular/forms';
import { Paciente } from '../../models/paciente';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private supabaseService: SupabaseService, private auth: AuthService) { }


  
}
