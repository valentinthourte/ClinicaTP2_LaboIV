import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Administrador } from '../../../models/administrador';
import { AuthService } from '../../../services/auth/auth.service';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { InformesComponent } from '../../informes/informes.component';

@Component({
  selector: 'app-perfil-administrador',
  imports: [SidebarAccesosComponent, InformesComponent],
  templateUrl: './perfil-administrador.component.html',
})
export class PerfilAdministradorComponent implements OnInit {
  usuario!: Administrador;

  constructor(private auth: AuthService,private usuariosService: UsuariosService) {}

  async ngOnInit() {
    const usuario = (await this.auth.getUsuarioLogueadoSupabase());
    if (usuario != null) {
      const admin = await this.usuariosService.obtenerAdministradorPorId(usuario.id);
      this.usuario = admin as Administrador;
    }
  }
}
