import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EstadoTurnoColorDirective } from '../../../../directivas/estado-turno-color.directive';
import { Turno } from '../../../../models/turno';
import { ModalCancelarTurnosComponent } from '../../modal-cancelar-turnos/modal-cancelar-turnos.component';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from '../../../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { TurnosService } from '../../../../services/turnos.service';
import { FormsModule } from '@angular/forms';
import { VisualHistoriaClinicaModalComponent } from '../../../visual-historia-clinica-modal/visual-historia-clinica-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-turnos-administrador',
  imports: [TitleCasePipe, EstadoTurnoColorDirective, CommonModule, FormsModule, MatTooltipModule],
  templateUrl: './turnos-administrador.component.html',
  styleUrl: './turnos-administrador.component.scss'
})
export class TurnosAdministradorComponent implements OnInit {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  filtro: string = '';

  constructor(private dialog: MatDialog, private spinner: SpinnerService, private toast: NgToastService, private turnosService: TurnosService) {}
  
  async ngOnInit() { 
    try {
      this.turnos = await this.turnosService.obtenerTodosTurnos();
      this.turnosFiltrados = this.turnos;
      
    } 
    catch(err: any) {
      this.toast.danger(`Se produjo un error al obtener todos los turnos: ${err.message}`);
    }
  }

  cancelarTurno(turno: Turno) {
    try {
      this.spinner.show()
      
      const dialogRef = this.dialog.open(ModalCancelarTurnosComponent);

          dialogRef.afterClosed().subscribe(async (comentario: string | undefined) => {
          if (comentario) {
            turno.comentario = comentario;
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

  filtrarTurnos() {
    const filtroLower = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnosService.filtrarTurnos(this.turnos, filtroLower);
  }


  obtenerEspecialistas() {
    let esp = this.turnos.filter(t => t.especialista !== null).map(t => t.especialista!);
    return esp;
  }


  obtenerNombreEspecialista(id: string): string {
    const esp = this.obtenerEspecialistas().find(e => e.id === id);
    return esp ? `${esp.nombre} ${esp.apellido}` : 'Desconocido';
  }

  obtenerPacientes() {
    let esp = this.turnos.filter(t => t.paciente !== null).map(t => t.paciente!);
    return esp;
  }


  obtenerNombrePaciente(id: string): string {
    const p = this.obtenerPacientes().find(p => p.id === id);
    return p ? `${p.nombre} ${p.apellido}` : 'Desconocido';
  }

  verHistoriaClinica(turno: Turno) {
    this.dialog.open(VisualHistoriaClinicaModalComponent, {data: {historia: turno.historiaClinica, paciente: turno.paciente}});
  }
  
}
