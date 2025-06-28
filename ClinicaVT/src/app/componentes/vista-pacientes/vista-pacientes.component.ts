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

@Component({
  selector: 'app-vista-pacientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-pacientes.component.html',
  styleUrl: './vista-pacientes.component.scss'
})
export class VistaPacientesComponent implements OnInit{

  
  pacientes: Paciente[] = [];
  
  constructor(private usuariosService: UsuariosService, private spinner: SpinnerService, private toast: NgToastService, private dialog: MatDialog, private excelService: ExportarExcelService) {}
  
  async ngOnInit() {
    try {
      this.spinner.show();
      this.pacientes = await this.usuariosService.obtenerPacientes();
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
    let pacientesExportar = this.pacientes.map(p => this.pacienteAFilaExcel(p));
  }
  pacienteAFilaExcel(p: Paciente): any {
    throw new Error('Method not implemented.');
  }
}
