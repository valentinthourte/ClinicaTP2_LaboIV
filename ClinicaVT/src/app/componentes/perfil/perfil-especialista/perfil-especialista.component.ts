import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Especialista } from '../../../models/especialista';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-perfil-especialista',
  templateUrl: './perfil-especialista.component.html',
})
export class PerfilEspecialistaComponent implements OnInit {
  usuario!: Especialista;

  constructor(private auth: AuthService, private usuariosService: UsuariosService) {}

  async ngOnInit() {
    const usuario = (await this.auth.getUsuarioLogueadoSupabase()).data.user;
    if (usuario != null) {
      const especialista = await this.usuariosService.obtenerEspecialistaPorId(usuario.id);
      this.usuario = especialista as Especialista;
    }
  }
}
