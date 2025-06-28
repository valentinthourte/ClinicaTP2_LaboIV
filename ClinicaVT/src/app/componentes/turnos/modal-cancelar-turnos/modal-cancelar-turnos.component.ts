import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancelar-turno-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-cancelar-turnos.component.html'
})
export class ModalCancelarTurnosComponent {
  form: FormGroup;
  accion: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalCancelarTurnosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accion: string }
    ) {
      this.form = this.fb.group({
        comentario: ['', Validators.required]
      });
      this.accion = data != null ? data.accion : "Cancelar";
    }
    

  enviar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.comentario);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
