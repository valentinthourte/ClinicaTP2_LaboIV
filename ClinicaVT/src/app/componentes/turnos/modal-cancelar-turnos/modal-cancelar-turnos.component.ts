import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancelar-turno-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-cancelar-turnos.component.html'
})
export class ModalCancelarTurnosComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalCancelarTurnosComponent>
  ) {
    this.form = this.fb.group({
    comentario: ['', Validators.required]
  });
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
