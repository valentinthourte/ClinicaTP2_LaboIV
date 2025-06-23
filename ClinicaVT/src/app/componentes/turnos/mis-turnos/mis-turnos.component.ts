import { Component } from '@angular/core';
import { MostrarSiRolDirective } from '../../../directivas/mostrar-si-rol.directive';
import { TipoUsuario } from '../../../enums/tipo-usuario.enum';
import { TurnosAdministradorComponent } from './turnos-administrador/turnos-administrador.component';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
@Component({
  selector: 'app-mis-turnos',
  imports: [MostrarSiRolDirective, TurnosAdministradorComponent, TurnosPacienteComponent, TurnosEspecialistaComponent],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.scss'
})
export class MisTurnosComponent {
  TipoUsuario = TipoUsuario;
}
