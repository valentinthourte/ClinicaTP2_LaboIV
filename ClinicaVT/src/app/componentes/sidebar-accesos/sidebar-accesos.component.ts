import { Component, Input } from '@angular/core';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MostrarSiRolDirective } from '../../directivas/mostrar-si-rol.directive';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MisHorariosComponent } from '../mis-horarios/mis-horarios.component';

@Component({
  selector: 'app-sidebar-accesos',
  templateUrl: './sidebar-accesos.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MostrarSiRolDirective, RouterModule],
})
export class SidebarAccesosComponent {
  
  TipoUsuario = TipoUsuario; 
  
  constructor(private dialog: MatDialog) {}
  formatearEspecialidades(especialidades: any[]) {
    return especialidades.map(e => e.especialidad?.especialidad || '').join(', ');
  }
  
  onClickMisHorarios() {
    this.dialog.open(MisHorariosComponent);
  }
}
