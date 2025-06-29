import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { Especialista } from '../../models/especialista';
import { AprobadoColorDirective } from '../../directivas/aprobado-color.directive';
import { SpinnerService } from '../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { EspecialidadPipe } from '../../pipes/especialidad.pipe';
import { RegistroEspecialistasComponent } from '../registro/registro-especialistas/registro-especialistas.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarAccionComponent } from '../confirmar-accion/confirmar-accion.component';
import { Especialidad } from '../../models/especialidad';
import { EspecialidadesService } from '../../services/especialidades.service';
import { EspecialidadEspecialista } from '../../models/especialidad-especialista';
import { EspecialidadesPipe } from '../../pipes/especialidades.pipe';
import { ExportarExcelService } from '../../services/exportar-excel.service';

@Component({
  selector: 'app-vista-especialistas',
  standalone: true,
  imports: [CommonModule, AprobadoColorDirective, EspecialidadesPipe],
  templateUrl: './vista-especialistas.component.html',
  styleUrl: './vista-especialistas.component.scss'
})
export class VistaEspecialistasComponent implements OnInit {
  especialistas: Especialista[] = [];
  constructor(private usuariosService: UsuariosService, 
              private spinner: SpinnerService, 
              private toast: NgToastService, 
              private dialog: MatDialog, 
              private especialidadesService: EspecialidadesService,
              private excelService: ExportarExcelService) {}
  
  async ngOnInit() {
    try {
      this.spinner.show();
      this.especialistas = await this.usuariosService.obtenerEspecialistas();
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al obtener especialistas: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }
  
  async onRechazarEspecialista(especialista: Especialista) {
    try {
      const confirmado = await this.confirmarAccion(`${especialista.nombre} ${especialista.apellido}`, 'rechazar');
      if (!confirmado) return;

      const especialistaRechazado = await this.usuariosService.rechazarEspecialista(especialista);
      
      especialista.aprobado = false;
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al rechazar especialista: ${err.message}`)
    }
    finally {
      this.spinner.hide();
    }
  }
  
  async onAprobarEspecialista(especialista: Especialista) {
    try {
      const confirmado = await this.confirmarAccion(`${especialista.nombre} ${especialista.apellido}`, 'aprobar');
      if (!confirmado) return;
      this.spinner.show()
      
      await this.usuariosService.aprobarEspecialista(especialista);
      especialista.aprobado = true;
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al aprobar especialista: ${err.message}`)
    }
    finally {
      this.spinner.hide();
    }
  }

  onAgregarEspecialista() {
    const dialogRef = this.dialog.open(RegistroEspecialistasComponent);

    dialogRef.afterClosed().subscribe((nuevoEspecialista: Especialista | undefined) => {
      if (nuevoEspecialista) {
        this.especialistas.push(nuevoEspecialista);
      }
    });
  }  

  confirmarAccion(nombre: string, accion: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmarAccionComponent, {
      width: '350px',
      data: {
        nombre: nombre,
        accion: accion
      }
    });

    return dialogRef.afterClosed().toPromise(); // convierte el Observable en Promise
  }

  formatearEspecialidades(especialidades: EspecialidadEspecialista[]): string {
    return this.especialidadesService.formatearEspecialidades(especialidades.map(e => e.especialidad));
  }

  onExportarExcel() {
    let pacientesExportar = this.especialistas.map(p => this.especialistaAFilaExcel(p));
    this.excelService.exportarAExcel(pacientesExportar, "Listado de especialistas", "listado_especialistas");
  }
  especialistaAFilaExcel(e: Especialista): any {
    return {
      "Nombre": `${e.nombre} ${e.apellido}`,
      "Email": e.email,
      "Edad": e.edad,
      "DNI": e.dni,
      "Especialidades": e.especialidades.map(e => e.especialidad.especialidad).join(', '),
      "URL Imagen": e.urlImagen
    }
  }
}
