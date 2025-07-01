import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Paciente } from '../../../models/paciente';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { MatDialog } from '@angular/material/dialog';
import { DetallePacienteAtendidoComponent } from '../../detalle-paciente-atendido/detalle-paciente-atendido.component';
import { contentSlideIn } from '../../../animations/slidein-leftright';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-perfil-paciente',
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil-paciente.component.html',
  animations: [contentSlideIn]
})
export class PerfilPacienteComponent implements OnInit {
  usuario!: Paciente;
  usuarioCargado: boolean = false;

  constructor(private auth: AuthService, private usuariosService: UsuariosService, private dialog: MatDialog, private spinner: SpinnerService, private toast: NgToastService) {}

  async ngOnInit(){
    try {
      this.spinner.show();
      const usuario = (await this.auth.getUsuarioLogueadoSupabase());
      if (usuario != null) {
        const paciente = await this.usuariosService.obtenerPacientePorId(usuario.id);
        this.usuario = paciente as Paciente;
        this.usuarioCargado = true;
      }
    }
    catch(err: any) {
      this.toast.danger(`Error al inicializar perfil de paciente: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
    
  }

  mostrarHistorialClinico() {
    this.dialog.open(DetallePacienteAtendidoComponent, {data: {paciente: this.usuario}});
  }
}
