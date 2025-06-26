import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialista } from '../../../../models/especialista';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionHorarioModalComponent } from '../seleccion-horario-modal/seleccion-horario-modal.component';
import { DiaHoraTurno } from '../../../../models/dia-hora-turno';
import { UsuariosService } from '../../../../services/usuarios.service';
import { Horario } from '../../../../models/horario';
import { AuthService } from '../../../../services/auth/auth.service';
import { Especialidad } from '../../../../models/especialidad';

@Component({
  selector: 'app-seleccion-dia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-dia.component.html',
})
export class SeleccionDiaComponent implements OnInit {
  @Input() profesional!: Especialista;
  @Input() especialidad!: Especialidad;
  @Output() diaSeleccionado = new EventEmitter<DiaHoraTurno>();

  diasDisponibles: Date[] = [];
  seleccionado?: Date;
  horarios: Horario[] = [];

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private usuariosService: UsuariosService
  ) {}

  async ngOnInit() {
    await this.cargarHorariosYGenerarDiasDisponibles();
  }

  async cargarHorariosYGenerarDiasDisponibles() {
    const especialistaConHorarios = await this.usuariosService.obtenerEspecialistaPorId(this.profesional.id!);
    this.horarios = especialistaConHorarios.horarios || [];

    const hoy = new Date();
    this.diasDisponibles = [];
    for (let i = 0; i < 15; i++) {
      const dia = new Date(hoy);
      dia.setDate(hoy.getDate() + i);
      const diaSemana = dia.getDay(); 

      if (diaSemana === 0) continue;

      const horarioDia = this.horarios.find(h => h.dia === diaSemana && h.habilitado);
      if (horarioDia) {
        this.diasDisponibles.push(dia);
      }
    }
    
  }

  formatearFecha(dia: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long' };
    return dia.toLocaleDateString('es-AR', opciones);
  }

  seleccionarDia(dia: Date) {
    this.seleccionado = dia;

    const dialogRef = this.dialog.open(SeleccionHorarioModalComponent, {
      data: {
        especialista: this.profesional,
        dia,
        especialidad: this.especialidad
      }
    });

    dialogRef.afterClosed().subscribe((horario: string | undefined) => {
      if (horario) {
        this.diaSeleccionado.emit({ Dia: dia, Hora: horario });
      }
    });
  }

  esSeleccionado(dia: Date): boolean {
    return this.seleccionado?.toDateString() === dia.toDateString();
  }
}
