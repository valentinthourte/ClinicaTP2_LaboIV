import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarAccionComponent } from '../confirmar-accion/confirmar-accion.component';

@Component({
  selector: 'app-modal-resenia',
  imports: [],
  templateUrl: './modal-resenia.component.html',
  styleUrl: './modal-resenia.component.scss'
})
export class ModalReseniaComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarAccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resenia: string }
  ) {}
}
