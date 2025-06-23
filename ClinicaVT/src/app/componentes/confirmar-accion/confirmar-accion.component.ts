import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-accion',
  imports: [],
  templateUrl: './confirmar-accion.component.html'
})
export class ConfirmarAccionComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarAccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string; accion: string }
  ) {}

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
