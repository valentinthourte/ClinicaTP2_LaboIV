import { Component } from '@angular/core';
import { InformeTurnosEspecialidadComponent } from './informe-turnos-especialidad/informe-turnos-especialidad.component';
import { InformeTurnosPorDiaComponent } from "./informe-turnos-por-dia/informe-turnos-por-dia.component";
import { MatDialog } from '@angular/material/dialog';
import { IngresosAlSistemaModalComponent } from './ingresos-al-sistema-modal/ingresos-al-sistema-modal.component';
import { TurnosSolicitadosPorRangoFechaComponent } from './turnos-solicitados-por-rango-fecha/turnos-solicitados-por-rango-fecha.component';

@Component({
  selector: 'app-informes',
  imports: [InformeTurnosEspecialidadComponent, InformeTurnosPorDiaComponent],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.scss'
})
export class InformesComponent {


  
  constructor(private dialog: MatDialog) {}

  descargarLogins() {
    this.dialog.open(IngresosAlSistemaModalComponent);
  }

  abrirInformeTurnosPorMedico() {
    this.dialog.open(TurnosSolicitadosPorRangoFechaComponent, {data: {soloRealizados: false}});
  }
  abrirInformeTurnosRealizadosPorMedico() {
    this.dialog.open(TurnosSolicitadosPorRangoFechaComponent, {data: {soloRealizados: true}});
  }
}
