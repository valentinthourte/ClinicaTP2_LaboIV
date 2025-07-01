import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Administrador } from '../../../models/administrador';
import { AuthService } from '../../../services/auth/auth.service';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { InformesComponent } from '../../informes/informes.component';
import { contentSlideIn } from '../../../animations/slidein-leftright';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-perfil-administrador',
  imports: [InformesComponent, CommonModule],
  templateUrl: './perfil-administrador.component.html',
  animations: [contentSlideIn]
})
export class PerfilAdministradorComponent implements OnInit {
  usuario!: Administrador;
  usuarioCargado: boolean = false;

  constructor(private auth: AuthService,private usuariosService: UsuariosService, private spinner: SpinnerService, private toast: NgToastService) {}

  async ngOnInit() {
    try {
      this.spinner.show();
      const usuario = (await this.auth.getUsuarioLogueadoSupabase());
      if (usuario != null) {
        const admin = await this.usuariosService.obtenerAdministradorPorId(usuario.id);
        this.usuario = admin as Administrador;
        this.usuarioCargado = true;
      }
    }
    catch(err: any) {
      this.toast.danger(`Se produjo un error al inicializar el perfil de administrador: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }
}
