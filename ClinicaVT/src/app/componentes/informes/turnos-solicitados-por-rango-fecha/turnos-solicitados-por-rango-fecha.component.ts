import { Component, Inject, OnInit } from '@angular/core';
import { EstadoTurnoColorDirective } from '../../../directivas/estado-turno-color.directive';
import { CommonModule } from '@angular/common';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker, MatEndDate, MatStartDate } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { Especialista } from '../../../models/especialista';
import { Turno } from '../../../models/turno';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../../services/usuarios.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { TurnosService } from '../../../services/turnos.service';
import { NgToastService } from 'ng-angular-popup';
import { ExportarExcelService } from '../../../services/exportar-excel.service';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-turnos-solicitados-por-rango-fecha',
  imports: [EstadoTurnoColorDirective, 
            CommonModule, 
            FormsModule, 
            MatNativeDateModule, 
            MatDateRangeInput, 
            MatDateRangePicker, 
            MatStartDate, 
            MatEndDate,
            MatLabel, 
            MatDatepickerToggle, 
            MatFormField,
            MatStepperModule,
            MatInputModule,
            ReactiveFormsModule],
  templateUrl: './turnos-solicitados-por-rango-fecha.component.html',
  styleUrl: './turnos-solicitados-por-rango-fecha.component.scss',
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class TurnosSolicitadosPorRangoFechaComponent implements OnInit {


  especialistas: Especialista[] = [];
  especialistaSeleccionado?: Especialista;
  fechaDesde?: Date;
  fechaHasta?: Date;
  turnosFranja: Turno[] = [];
  
  constructor(private dialogRef: MatDialogRef<TurnosSolicitadosPorRangoFechaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: { soloRealizados: boolean },
              private usauriosService: UsuariosService, 
              private turnosService: TurnosService, 
              private toast: NgToastService,
              private excelService: ExportarExcelService,
              private spinner: SpinnerService) {}

  async ngOnInit() {
    this.especialistas = await this.usauriosService.obtenerEspecialistas();
  }

  seleccionarEspecialista(especialista: Especialista) {
    this.especialistaSeleccionado = especialista;
    this.turnosFranja = [];
  }

  async buscarTurnos() {
    try {
      this.spinner.show();
      if (!this.fechaDesde || !this.fechaHasta)
        throw new Error("Por favor, ingrese una fecha desde y hasta");
      if (!this.especialistaSeleccionado)
        throw new Error("Por favor, seleccione un especialista. ");
      const desdeStr = this.fechaDesde!.toISOString().split('T')[0];
      const hastaStr = this.fechaHasta!.toISOString().split('T')[0];
      if (this.data.soloRealizados)
        this.turnosFranja = await this.turnosService.obtenerTurnosRealizadosPorEspecialistaFranjaHoraria(desdeStr, hastaStr, this.especialistaSeleccionado);  
      else
        this.turnosFranja = await this.turnosService.obtenerTurnosPorEspecialistaFranjaHoraria(desdeStr, hastaStr, this.especialistaSeleccionado);
      if (this.turnosFranja.length == 0)
        this.toast.info("No se encontraron turnos. ");
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Se produjo un error al buscar turnos: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  exportarTurnos() {
    let filas = this.turnosFranja.map(t => this.turnosService.turnoAFilaExcel(t));
    const desdeStr = this.fechaDesde!.toISOString().split('T')[0];
    const hastaStr = this.fechaHasta!.toISOString().split('T')[0];
    const titulo = `Turnos de ${this.especialistaSeleccionado?.nombre} ${this.especialistaSeleccionado?.apellido} del ${desdeStr} al ${hastaStr}`;
    const nombreArchivo = `turnos_${this.especialistaSeleccionado?.nombre}_${this.especialistaSeleccionado?.apellido}_${desdeStr}_${hastaStr}`;
    this.excelService.exportarAExcel(filas, titulo, nombreArchivo);
  }
}
