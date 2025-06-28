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
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalCancelarTurnosComponent } from '../../modal-cancelar-turnos/modal-cancelar-turnos.component';
import { ModalReseniaComponent } from '../../../modal-resenia/modal-resenia.component';
import { ModalCalificarAtencionComponent } from '../../../modal-calificar-atencion/modal-calificar-atencion.component';

@Component({
  selector: 'app-turnos-paciente',
  imports: [CommonModule, FormsModule, EspecialidadPipe, EspecialistaPipe, EstadoTurnoColorDirective, MatTooltipModule],
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
    this.turnosFiltrados = this.turnosService.filtrarTurnos(this.turnos, filtroLower);
  }

  async ngOnInit() {
    const usuario = await this.auth.getUsuarioLogueadoSupabase();
    this.turnos = await this.turnosService.obtenerTurnosPacientePorId(usuario.id);
    this.turnosFiltrados = this.turnos;
    console.log(this.turnos);
    
  }

  obtenerEspecialistas() {
    let esp = this.turnos.filter(t => t.especialista !== null).map(t => t.especialista!);
    return esp;
  }

  obtenerNombreEspecialista(id: string): string {
    const esp = this.obtenerEspecialistas().find(e => e.id === id);
    return esp ? `${esp.nombre} ${esp.apellido}` : 'Desconocido';
  }

  calificarAtencion(turno: Turno) {
    const dialogRef = this.dialog.open(ModalCalificarAtencionComponent);

    dialogRef.afterClosed().subscribe(async (calificacion: number | undefined) => {
      if (calificacion) {
        await this.turnosService.setearTurnoCalificado(turno, calificacion);
        this.toast.success("Atencion calificada con éxito!");
      }
    });
  }

  async cancelarTurno(turno: Turno) {
    try {

      this.spinner.show()
      
      const dialogRef = this.dialog.open(ModalCancelarTurnosComponent);

          dialogRef.afterClosed().subscribe(async (comentario: string | undefined) => {
          if (comentario) {
            turno.comentario = comentario;
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

  verResenia(turno: Turno) {
    this.dialog.open(ModalReseniaComponent, {data: {resenia:  turno.comentario}});
  }
}
