import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Especialista } from '../../../models/especialista';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspecialidadEspecialista } from '../../../models/especialidad-especialista';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { NgToastService } from 'ng-angular-popup';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-especialista',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, SidebarAccesosComponent],
  templateUrl: './perfil-especialista.component.html',
})
export class PerfilEspecialistaComponent implements OnInit {
  usuario!: Especialista;
  especialidadesDisponibles: Especialidad[] = [];
  formEspecialidad!: FormGroup;

  constructor(
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private especialidadesService: EspecialidadesService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private spinner: SpinnerService
  ) {}

  async ngOnInit() {
    const usuario = (await this.auth.getUsuarioLogueadoSupabase());
    if (usuario != null) {
      this.usuario = await this.usuariosService.obtenerEspecialistaPorId(usuario.id) as Especialista;
    }

    this.especialidadesDisponibles = await this.especialidadesService.obtenerEspecialidades();

    this.formEspecialidad = this.fb.group({
      especialidadId: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(5)]]
    });
  }

  formatearEspecialidades(especialidades: EspecialidadEspecialista[]): string {
    if (especialidades != null && especialidades.length > 0)
      return this.especialidadesService.formatearEspecialidades(especialidades.map(e => e.especialidad));
    else 
      return " - ";
  }

  async agregarEspecialidad() {
    try {
      if (this.formEspecialidad.invalid) 
        throw new Error("El formulario no es válido. ");
  
      const { especialidadId, duracion } = this.formEspecialidad.value;
      this.spinner.show();
      await this.usuariosService.agregarEspecialidadAEsp(this.usuario.id, especialidadId, duracion);
      this.usuario = await this.usuariosService.obtenerEspecialistaPorId(this.usuario.id!) as Especialista;
      this.formEspecialidad.reset();
      this.toast.success("Especialidad agregada!");
    }
    catch (err: any) {
      this.toast.danger(`Error al agregar especialidad: ${err.message}`);
    }    
    finally {
      this.spinner.hide();
    }
  }

  async eliminarEspecialidad(id: string) {
    try {
      this.spinner.show();
      await this.usuariosService.eliminarEspecialidadAEsp(this.usuario.id, id);
      this.usuario = await this.usuariosService.obtenerEspecialistaPorId(this.usuario.id!) as Especialista;
      this.toast.success("Especialidad eliminada!");
    }
    catch (err: any) {
      this.toast.danger(`Error al eliminar especialidad de especialista: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
    
  }
}