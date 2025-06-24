import { Component, Input } from '@angular/core';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MostrarSiRolDirective } from '../../directivas/mostrar-si-rol.directive';

@Component({
  selector: 'app-sidebar-accesos',
  templateUrl: './sidebar-accesos.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MostrarSiRolDirective],
})
export class SidebarAccesosComponent {

  TipoUsuario = TipoUsuario; // para usar en template (por si querés pasar a la directiva)
  
  formatearEspecialidades(especialidades: any[]) {
    return especialidades.map(e => e.especialidad?.especialidad || '').join(', ');
  }
}
