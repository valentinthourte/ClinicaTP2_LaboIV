import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Paciente } from '../../../models/paciente';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { MatDialog } from '@angular/material/dialog';
import { DetallePacienteAtendidoComponent } from '../../detalle-paciente-atendido/detalle-paciente-atendido.component';

@Component({
  selector: 'app-perfil-paciente',
  imports: [CommonModule, RouterModule, SidebarAccesosComponent],
  templateUrl: './perfil-paciente.component.html',
})
export class PerfilPacienteComponent implements OnInit {
  usuario!: Paciente;

  constructor(private auth: AuthService, private usuariosService: UsuariosService, private dialog: MatDialog) {}

  async ngOnInit(){
    const usuario = (await this.auth.getUsuarioLogueadoSupabase());
    if (usuario != null) {
      const paciente = await this.usuariosService.obtenerPacientePorId(usuario.id);
      this.usuario = paciente as Paciente;
    }
  }

  mostrarHistorialClinico() {
    this.dialog.open(DetallePacienteAtendidoComponent, {data: {paciente: this.usuario}});
  }
}
