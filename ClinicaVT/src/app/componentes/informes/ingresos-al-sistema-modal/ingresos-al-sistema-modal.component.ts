import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Ingreso } from '../../../models/ingreso';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { UsuarioPipePipe } from '../../../pipes/usuario-pipe.pipe';
import { ExportarExcelService } from '../../../services/exportar-excel.service';

@Component({
  selector: 'app-ingresos-al-sistema-modal',
  imports: [DatePipe, CommonModule, UsuarioPipePipe],
  templateUrl: './ingresos-al-sistema-modal.component.html',
  styleUrl: './ingresos-al-sistema-modal.component.scss'
})
export class IngresosAlSistemaModalComponent implements OnInit {

  ingresos: Ingreso[] = [];
  
  constructor(private dialogRef: MatDialogRef<IngresosAlSistemaModalComponent>,private auth: AuthService, private toast: NgToastService, private excelService: ExportarExcelService) {}

  async ngOnInit() {
    try {
      this.ingresos = await this.auth.obtenerIngresosAlSistema();
    }
    catch(err: any) {
      this.toast.danger(`Error al obtener ingresos al sistema: ${err.message}`);
    }
  }
  cerrar() {
    this.dialogRef.close();
  }

  descargarIngresos() {
    try {
      let filas = this.ingresos.map(i => this.ingresoAFilaExcel(i));
      this.excelService.exportarAExcel(filas, "Ingresos al sistema", 'ingresos_al_sistema');
    }
    catch(err: any) {
      this.toast.danger(`Error al descargar ingresos: ${err.message}`);
    }
  }

  ingresoAFilaExcel(i: Ingreso): any {
    const fecha = new Date(i.created_at);
    return {
      Nombre: i.usuario?.nombre ?? '',
      Apellido: i.usuario?.apellido ?? '',
      Email: i.usuario?.email ?? '',
      Tipo: i.usuario?.tipo ?? '',
      Fecha: fecha.toLocaleDateString(),
      Hora: fecha.toLocaleTimeString(),  
    };
  }

}
