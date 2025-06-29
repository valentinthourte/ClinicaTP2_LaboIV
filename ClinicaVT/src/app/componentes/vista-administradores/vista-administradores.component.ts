import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { UsuariosService } from '../../services/usuarios.service';
import { SpinnerService } from '../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarAdministradorComponent } from '../registro/registrar-administrador/registrar-administrador.component';
import { ExportarExcelService } from '../../services/exportar-excel.service';

@Component({
  selector: 'app-vista-administradores',
  imports: [CommonModule],
  templateUrl: './vista-administradores.component.html',
  styleUrl: './vista-administradores.component.scss'
})
export class VistaAdministradoresComponent implements OnInit {
  protected administradores: Administrador[] = [];
  
  constructor(private usuariosService: UsuariosService, 
              private spinner: SpinnerService, 
              private toast: NgToastService, 
              private dialog: MatDialog,
              private excelService: ExportarExcelService) {}

  async ngOnInit() {
    try {
      this.spinner.show();
      this.administradores = await this.usuariosService.obtenerAdministradores();
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al obtener especialistas: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }

  onAgregarAdministrador() {
    const dialogRef = this.dialog.open(RegistrarAdministradorComponent);

    dialogRef.afterClosed().subscribe((nuevoAdmin: Administrador | undefined) => {
      if (nuevoAdmin) {
        this.administradores.push(nuevoAdmin);
      }
    });
  }

    onExportarExcel() {
      let pacientesExportar = this.administradores.map(a => this.usuariosService.administradorAFilaExcel(a));
      this.excelService.exportarAExcel(pacientesExportar, "Listado de administradores", "listado_administradores");
    }

}
