import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-calificar-atencion',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-calificar-atencion.component.html',
  styleUrl: './modal-calificar-atencion.component.scss'
})
export class ModalCalificarAtencionComponent {
  calificacion: number = 0;

  constructor(private dialogRef: MatDialogRef<ModalCalificarAtencionComponent>) {}

  calificar(valor: number) {
    this.calificacion = valor;
  }

  confirmar() {
    this.dialogRef.close(this.calificacion);
  }

  cerrar() {
    this.dialogRef.close();
  }

}
