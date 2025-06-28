import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarAccionComponent } from '../confirmar-accion/confirmar-accion.component';
import { HistoriaClinica } from '../../models/historia-clinica';
import { Paciente } from '../../models/paciente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visual-historia-clinica-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './visual-historia-clinica-modal.component.html',
  styleUrl: './visual-historia-clinica-modal.component.scss'
})
export class VisualHistoriaClinicaModalComponent {


  constructor( public dialogRef: MatDialogRef<ConfirmarAccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { historia: HistoriaClinica; paciente: Paciente }) {}

  cerrar() {
    this.dialogRef.close();
  }

}
