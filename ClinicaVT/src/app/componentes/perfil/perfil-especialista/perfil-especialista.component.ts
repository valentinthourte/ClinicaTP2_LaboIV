import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Especialista } from '../../../models/especialista';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspecialidadEspecialista } from '../../../models/especialidad-especialista';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { NgToastService } from 'ng-angular-popup';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarEspecialidadComponent } from '../editar-especialidad/editar-especialidad.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-perfil-especialista',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, SidebarAccesosComponent, CommonModule, FormsModule, MatTooltip],
  templateUrl: './perfil-especialista.component.html',
})
export class PerfilEspecialistaComponent implements OnInit {
  usuario!: Especialista;
  especialidadesDisponibles: Especialidad[] = [];
  formEspecialidad!: FormGroup;
  especialidadSeleccionada: string | null = null;
  duracionSeleccionada: number | null = null;
  constructor(
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private especialidadesService: EspecialidadesService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private spinner: SpinnerService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    const usuario = (await this.auth.getUsuarioLogueadoSupabase());
    if (usuario != null) {
      this.usuario = await this.usuariosService.obtenerEspecialistaPorId(usuario.id) as Especialista;
    }

    this.especialidadesDisponibles = await this.especialidadesService.obtenerEspecialidades();

    this.formEspecialidad = this.fb.group({
      especialidadId: [null, Validators.required],
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
      if (!this.especialidadSeleccionada || !this.duracionSeleccionada || this.duracionSeleccionada < 5 || this.duracionSeleccionada > 60) {
        this.toast.warning("Seleccioná una especialidad válida y una duración entre 5 y 60 minutos.");
        return;
      }
      if (this.usuario.especialidades.map(e => e.especialidad.id).includes(this.especialidadSeleccionada))
        this.toast.warning(`El especialista ya cuenta con la especialidad ${this.usuario.especialidades.find(e => e.especialidad.id)?.especialidad.especialidad}. Podes editar la duracion!`);
      else {
        this.spinner.show();
        await this.usuariosService.agregarEspecialidadAEsp(this.usuario.id, this.especialidadSeleccionada, this.duracionSeleccionada);
        this.usuario = await this.usuariosService.obtenerEspecialistaPorId(this.usuario.id!) as Especialista;
  
        this.especialidadSeleccionada = null;
        this.duracionSeleccionada = null;
  
        this.toast.success("Especialidad agregada!");
      }
    } 
    catch (err: any) {
      this.toast.danger(`Error al agregar especialidad: ${err.message}`);
    } finally {
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

  logControlesInvalidos(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.invalid) {
        console.warn(`Control inválido: ${key}`, control.errors);
      }
    });
  } 

  editarEspecialidad(especialidad: EspecialidadEspecialista) {
    const dialogRef = this.dialog.open(EditarEspecialidadComponent, {data: especialidad.duracion});

    dialogRef.afterClosed().subscribe(async (duracion: number | undefined) => {
      if (duracion) {
        try {
          this.spinner.show();
          especialidad.duracion = duracion;
          await this.especialidadesService.actualizarDuracionEspecialidadEspecialista(this.usuario, especialidad);
          this.toast.success("Especialidad actualizada correctamente!");
        }
        catch(err: any) {
          this.toast.danger(`Se produjo un error al actualizar duración de especialista: ${err.message}`);
        }
        finally {
          this.spinner.hide();
        }
      }
    });
  }
}