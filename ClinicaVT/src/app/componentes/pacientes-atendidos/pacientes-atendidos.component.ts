import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DetallePacienteAtendidoComponent } from '../detalle-paciente-atendido/detalle-paciente-atendido.component';

@Component({
  selector: 'app-pacientes-atendidos',
  imports: [CommonModule],
  templateUrl: './pacientes-atendidos.component.html',
  styleUrl: './pacientes-atendidos.component.scss'
})
export class PacientesAtendidosComponent implements OnInit {
  pacientes: Paciente[] = [];
  
  constructor(private auth: AuthService, private usuariosService: UsuariosService, private dialog: MatDialog) {}

  async ngOnInit() {
    const user = await this.auth.getUsuarioLogueadoSupabase();
    this.pacientes = await this.usuariosService.obtenerPacientesPorEspecialistaId(user.id);
  }

  abrirDetalles(paciente: Paciente) {
    this.dialog.open(DetallePacienteAtendidoComponent, {data: {paciente: paciente}});
  }

}
