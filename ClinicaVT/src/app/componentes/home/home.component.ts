import { Component } from '@angular/core';
import { MostrarSiRolDirective } from '../../directivas/mostrar-si-rol.directive';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { PerfilPacienteComponent } from '../perfil/perfil-paciente/perfil-paciente.component';
import { PerfilAdministradorComponent } from '../perfil/perfil-administrador/perfil-administrador.component';
import { PerfilEspecialistaComponent } from '../perfil/perfil-especialista/perfil-especialista.component';
import { SidebarAccesosComponent } from '../sidebar-accesos/sidebar-accesos.component';
import { contentSlideIn, sidebarSlideIn } from '../../animations/slidein-leftright';

@Component({
  selector: 'app-home',
  imports: [MostrarSiRolDirective, PerfilPacienteComponent, PerfilAdministradorComponent, PerfilEspecialistaComponent, SidebarAccesosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [sidebarSlideIn]
})
export class HomeComponent {
  TipoUsuario = TipoUsuario;
}
