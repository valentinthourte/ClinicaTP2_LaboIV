import { Component, Input } from '@angular/core';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MostrarSiRolDirective } from '../../directivas/mostrar-si-rol.directive';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MisHorariosComponent } from '../mis-horarios/mis-horarios.component';
import { AuthService } from '../../services/auth/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Horario } from '../../models/horario';
import { EspecialistaService } from '../../services/especialista.service';
import { NgToastService } from 'ng-angular-popup';
import { SpinnerService } from '../../services/shared/spinner.service';

@Component({
  selector: 'app-sidebar-accesos',
  templateUrl: './sidebar-accesos.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MostrarSiRolDirective, RouterModule],
})
export class SidebarAccesosComponent {
  
  TipoUsuario = TipoUsuario; 
  
  constructor(private dialog: MatDialog, 
              private auth: AuthService, 
              private usuariosService: UsuariosService, 
              private especialistaService: EspecialistaService, 
              private toast: NgToastService,
              private spinner: SpinnerService) {}
  formatearEspecialidades(especialidades: any[]) {
    return especialidades.map(e => e.especialidad?.especialidad || '').join(', ');
  }
  
  async onClickMisHorarios() {
    try {
      this.spinner.show();
      let usuario = await this.auth.getUsuarioLogueadoSupabase();
      if (usuario != null) {
        let especialista = await this.usuariosService.obtenerEspecialistaPorId(usuario.id);
        let horarios = especialista.horarios != null && especialista.horarios.length > 0 ? especialista.horarios : this.especialistaService.generarHorariosDefecto();
        const dialogRef = this.dialog.open(MisHorariosComponent, {
          data: {horarios: horarios}
        });
  
        dialogRef.afterClosed().subscribe(async (horarios: Horario[] | undefined) => {
            if (horarios) {
              try {
                await this.usuariosService.setearHorariosEspecialista(especialista, horarios);
                this.toast.success("Horarios guardados!");
              }
              catch(err: any) {
                console.log(err);
                this.toast.danger(`Error al persistir horarios: ${err.message}`);
              }
            }
        });
      }
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Se ha producido un error: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }
}
