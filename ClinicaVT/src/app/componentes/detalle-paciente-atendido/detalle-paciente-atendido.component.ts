import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarAccionComponent } from '../confirmar-accion/confirmar-accion.component';
import { Paciente } from '../../models/paciente';
import { Turno } from '../../models/turno';
import { TurnosService } from '../../services/turnos.service';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';
import { VisualHistoriaClinicaModalComponent } from '../visual-historia-clinica-modal/visual-historia-clinica-modal.component';
import { ExportarPdfService } from '../../services/exportar-pdf.service';
import { NgToastService } from 'ng-angular-popup';
import { Especialista } from '../../models/especialista';

@Component({
  selector: 'app-detalle-paciente-atendido',
  imports: [TitleCasePipe, FormsModule, CommonModule, EstadoTurnoColorDirective],
  templateUrl: './detalle-paciente-atendido.component.html',
  styleUrl: './detalle-paciente-atendido.component.scss'
})
export class DetallePacienteAtendidoComponent implements OnInit {
  especialistaSeleccionado: Especialista | undefined;
  turnos: Turno[] = [];
  
  constructor(public dialogRef: MatDialogRef<ConfirmarAccionComponent>, @Inject(MAT_DIALOG_DATA) public data: { paciente: Paciente },
              private turnosService: TurnosService, private dialog: MatDialog,
              private pdfService: ExportarPdfService,
              private toast: NgToastService) {}
    

  async ngOnInit(){
    this.turnos = await this.turnosService.obtenerTurnosPacientePorId(this.data.paciente.id);
    console.log(this.turnos);
    
  }

  mostrarHistoriaClinica(turno: Turno) {
    this.dialog.open(VisualHistoriaClinicaModalComponent, {data: {paciente: turno.paciente, historia: turno.historiaClinica}});
  }

  cerrar() {
    this.dialogRef.close();
  }

  get especialistasUnicos() {
    const ids = new Set();
    return this.turnos
    .filter(t => t.especialista)
      .filter(t => {
        const id = t.especialista!.id;
        if (ids.has(id)) return false;
        ids.add(id);
        return true;
      })
    .map(t => t.especialista!);
  }

  async descargarHistoriaClinica() {
    try {
      let paciente = this.data.paciente;
      let encabezados = this.turnosService.obtenerEncabezadosHistorialClinico();
      let turnosUsar = this.especialistaSeleccionado == null ? this.turnos : this.turnos.filter(t => t.especialista!.id == this.especialistaSeleccionado);
      let filasTurnos = turnosUsar.map(t => this.turnosService.turnoToArray(t));
      if (filasTurnos.length > 0) {
        let titulo = `Historial clínico de ${paciente.nombre} ${paciente.apellido}`;
        let nombreArchivo = `historial_clinico_${paciente.nombre}_${paciente.apellido}`;
        let subtitulo = `Cantidad de historiales: ${filasTurnos.length}`;
        await this.pdfService.generarPDFConFoto(subtitulo, encabezados, filasTurnos, paciente.urlImagenUno, titulo, nombreArchivo);
        this.toast.success("PDF generado!");
      }
      else 
        this.toast.warning("El paciente no tiene historias clínicas guardadas. ");
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al exportar historial clínico a PDF: ${err.message}`);
    }
  }
}
