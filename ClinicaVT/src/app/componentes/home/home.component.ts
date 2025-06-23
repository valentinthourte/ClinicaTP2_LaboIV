import { Component } from '@angular/core';
import { MostrarSiRolDirective } from '../../directivas/mostrar-si-rol.directive';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { PerfilPacienteComponent } from '../perfil/perfil-paciente/perfil-paciente.component';
import { PerfilAdministradorComponent } from '../perfil/perfil-administrador/perfil-administrador.component';
import { PerfilEspecialistaComponent } from '../perfil/perfil-especialista/perfil-especialista.component';

@Component({
  selector: 'app-home',
  imports: [MostrarSiRolDirective, PerfilPacienteComponent, PerfilAdministradorComponent, PerfilEspecialistaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  TipoUsuario = TipoUsuario;
}
