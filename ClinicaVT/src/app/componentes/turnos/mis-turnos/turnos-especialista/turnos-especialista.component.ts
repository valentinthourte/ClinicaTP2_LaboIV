import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../../../models/turno';
import { Paciente } from '../../../../models/paciente';
import { EspecialidadPipe } from '../../../../pipes/especialidad.pipe';
import { TurnosService } from '../../../../services/turnos.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { EstadoTurnoColorDirective } from '../../../../directivas/estado-turno-color.directive';
import { SpinnerService } from '../../../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { ModalCancelarTurnosComponent } from '../../modal-cancelar-turnos/modal-cancelar-turnos.component';

@Component({
  selector: 'app-turnos-especialista',
  standalone: true,
  imports: [CommonModule, FormsModule, EspecialidadPipe, EstadoTurnoColorDirective],
  templateUrl: './turnos-especialista.component.html',
  styleUrl: './turnos-especialista.component.scss'
})
export class TurnosEspecialistaComponent implements OnInit {

  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  pacientes: Paciente[] = [];
  filtro: string = '';

  constructor(private turnosService: TurnosService, private auth: AuthService, private spinner: SpinnerService, private toast: NgToastService, private dialog: MatDialog) {}

  async ngOnInit() {
    let especialista = await this.auth.getUsuarioLogueadoSupabase();
    this.turnos = await this.turnosService.obtenerTurnosPorEspecialistaId(especialista.id);
    this.turnosFiltrados = this.turnos;
  }

  filtrarTurnos() {
    const filtroLower = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.especialidad?.especialidad.toLowerCase().includes(filtroLower) ||
      this.obtenerNombrePaciente(t.pacienteId).toLowerCase().includes(filtroLower)
    );
  }

  obtenerPacientes() {
    let esp = this.turnos.filter(t => t.paciente !== null).map(t => t.paciente!);
    return esp;
  }


  obtenerNombrePaciente(id: string): string {
    const p = this.obtenerPacientes().find(p => p.id === id);
    return p ? `${p.nombre} ${p.apellido}` : 'Desconocido';
  }

  async aceptarTurno(turno: Turno) {
    try {
      let turnoNuevo = await this.turnosService.aceptarTurno(turno);            
      this.reemplazarTurno(turnoNuevo);
      this.toast.success("Turno aceptado con éxito. ");
    }
    catch(err: any) {
      this.toast.danger(`Error al aceptar turno: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }

  cancelarTurno(turno: Turno) {
    try {
      this.spinner.show()
      
      const dialogRef = this.dialog.open(ModalCancelarTurnosComponent);

          dialogRef.afterClosed().subscribe(async (comentario: string | undefined) => {
          if (comentario) {
            turno.comentarioPaciente = comentario;
            let turnoNuevo = await this.turnosService.cancelarTurno(turno);
            this.reemplazarTurno(turnoNuevo);
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

  private reemplazarTurno(turnoNuevo: Turno) {
    const idx = this.turnos.findIndex(t => t.id === turnoNuevo.id);
    if (idx !== -1) {
      this.turnos[idx].estado = turnoNuevo.estado;
    }
  }

  rechazarTurno(turno: Turno) {
    try {
      this.spinner.show()
      const dialogRef = this.dialog.open(ModalCancelarTurnosComponent);

      dialogRef.afterClosed().subscribe(async (comentario: string | undefined) => {
        if (comentario) {
          try {
            turno.comentarioEspecialista = comentario;
            let turnoNuevo = await this.turnosService.rechazarTurno(turno);
            this.reemplazarTurno(turnoNuevo);
            this.toast.success("Turno rechazado con éxito. ");
          }
          catch(err: any) {
            this.toast.danger(`Error al rechazar turno: ${err.message}`);
          }
        }
      });
    }
    catch(err: any) {
      this.toast.danger(`Error al rechazar turno: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }

  finalizarTurno(turno: Turno) {
    try {
      this.spinner.show()
      
      const dialogRef = this.dialog.open(ModalCancelarTurnosComponent);

      dialogRef.afterClosed().subscribe(async (comentario: string | undefined) => {
      if (comentario) {
        try {

          turno.comentarioEspecialista = comentario;
          let turnoNuevo = await this.turnosService.finalizarTurno(turno);
          this.reemplazarTurno(turnoNuevo);
          this.toast.success("Turno finalizado con éxito. ");
        }    
        catch(err: any) {
          this.toast.danger(`Error al finalizar turno: ${err.message}`);
        }
      }
    });
      
    }
    catch(err: any) {
      this.toast.danger(`Error al finalizar turno: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }

  verResenia(turno: Turno) {
    console.log('Ver reseña:', turno);
    // TODO: implementar lógica
  }
}
