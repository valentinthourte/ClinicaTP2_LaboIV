import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../models/paciente';
import { UsuariosService } from '../../services/usuarios.service';
import { SpinnerService } from '../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { RegistroPacientesComponent } from '../registro/registro-pacientes/registro-pacientes.component';
import { MatDialog } from '@angular/material/dialog';
import { ExportarExcelService } from '../../services/exportar-excel.service';
import { DetallePacienteAtendidoComponent } from '../detalle-paciente-atendido/detalle-paciente-atendido.component';
import { TurnosService } from '../../services/turnos.service';
import { MatTooltip } from '@angular/material/tooltip';
import { scaleInOut } from '../../animations/scale-in-out';

@Component({
  selector: 'app-vista-pacientes',
  imports: [CommonModule, FormsModule, MatTooltip],
  templateUrl: './vista-pacientes.component.html',
  styleUrl: './vista-pacientes.component.scss',
  animations: [scaleInOut]
})
export class VistaPacientesComponent implements OnInit{
 
  pacientes: Paciente[] = [];
  tablaCargada: boolean = false;

  constructor(private usuariosService: UsuariosService, 
              private spinner: SpinnerService, 
              private toast: NgToastService, 
              private dialog: MatDialog, 
              private excelService: ExportarExcelService,
              private turnosService: TurnosService) {}
  
  async ngOnInit() {
    try {
      this.spinner.show();
      this.pacientes = await this.usuariosService.obtenerPacientes();
      this.tablaCargada = true;
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al obtener especialistas: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }
  
  onAgregarPaciente() {
    const dialogRef = this.dialog.open(RegistroPacientesComponent);

      dialogRef.afterClosed().subscribe((nuevoPaciente: Paciente | undefined) => {
      if (nuevoPaciente) {
        this.pacientes.push(nuevoPaciente);
      }
    });
  }

  onExportarExcel() {
    let pacientesExportar = this.pacientes.map(p => this.usuariosService.pacienteAFilaExcel(p));
    this.excelService.exportarAExcel(pacientesExportar, "Listado de pacientes", "listado_pacientes");
  }


  mostrarHistorialClinico(paciente: Paciente) {
    this.dialog.open(DetallePacienteAtendidoComponent, {data: {paciente: paciente}});
  }

  async descargarTurnosPaciente(paciente: Paciente) {
    let turnos = await this.turnosService.obtenerTurnosPacientePorId(paciente.id);
    if (turnos != null && turnos.length > 0) {
      let turnosMapeados = turnos.map(t => this.turnosService.turnoAFilaExcel(t));
      this.excelService.exportarAExcel(turnosMapeados, `Turnos de ${paciente.nombre} ${paciente.apellido}`, `turnos_${paciente.nombre}_${paciente.apellido}`);
    }
    else {
      this.toast.warning(`El paciente ${paciente.nombre} ${paciente.apellido} no cuenta con turnos para exportar. `);
    }
  }
}
