import { Component, OnInit } from '@angular/core';
import { Turno } from '../../../../models/turno';
import { Especialista } from '../../../../models/especialista';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnosService } from '../../../../services/turnos.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { EspecialidadPipe } from '../../../../pipes/especialidad.pipe';
import { EspecialistaPipe } from '../../../../pipes/especialista.pipe';
import { EstadoTurnoColorDirective } from '../../../../directivas/estado-turno-color.directive';
import { SpinnerService } from '../../../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { ModalCancelarTurnosComponent } from '../../modal-cancelar-turnos/modal-cancelar-turnos.component';

@Component({
  selector: 'app-turnos-paciente',
  imports: [CommonModule, FormsModule, EspecialidadPipe, EspecialistaPipe, EstadoTurnoColorDirective],
  templateUrl: './turnos-paciente.component.html',
  styleUrl: './turnos-paciente.component.scss'
})
export class TurnosPacienteComponent implements OnInit {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  filtro: string = '';
  listaDeEspecialistas: Especialista[] = [];
  
  constructor(private auth: AuthService,private turnosService: TurnosService, private spinner: SpinnerService, private toast: NgToastService, private dialog: MatDialog) {}

  filtrarTurnos() {
    const filtroLower = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.especialidad?.especialidad.toLowerCase().includes(filtroLower) ||
      this.obtenerNombreEspecialista(t.especialistaId).toLowerCase().includes(filtroLower)
    );
  }

  async ngOnInit() {
    const usuario = await this.auth.getUsuarioLogueadoSupabase();
    this.turnos = await this.turnosService.obtenerTurnosPacientePorId(usuario.id);
    this.turnosFiltrados = this.turnos;
  }

  obtenerEspecialistas() {
    let esp = this.turnos.filter(t => t.especialista !== null).map(t => t.especialista!);
    return esp;
  }


  obtenerNombreEspecialista(id: string): string {
    const esp = this.obtenerEspecialistas().find(e => e.id === id);
    return esp ? `${esp.nombre} ${esp.apellido}` : 'Desconocido';
  }

  calificarAtencion(_t18: any) {
    throw new Error('Method not implemented.');
  }

  completarEncuesta(_t18: any) {
    throw new Error('Method not implemented.');
  }

  async cancelarTurno(turno: Turno) {
    try {

      this.spinner.show()
      
      const dialogRef = this.dialog.open(ModalCancelarTurnosComponent);

          dialogRef.afterClosed().subscribe(async (comentario: string | undefined) => {
          if (comentario) {
            turno.comentarioPaciente = comentario;
            let turnoNuevo = await this.turnosService.cancelarTurno(turno);
            const idx = this.turnos.findIndex(t => t.id === turnoNuevo.id);
            if (idx !== -1) {
              this.turnos[idx].estado = turnoNuevo.estado;
            }
            this.toast.success("Turno cancelado con éxito. ");
          }
        });
      
    }
    catch(err: any) {
      this.toast.danger(`Error al cancelar turno: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }

  verResenia(_t22: Turno) {
    throw new Error('Method not implemented.');
  }
}
