import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { NgToastService } from 'ng-angular-popup';
import { EspecialidadEspecialista } from '../../../models/especialidad-especialista';

@Component({
  selector: 'app-editar-especialidad',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-especialidad.component.html',
  styleUrl: './editar-especialidad.component.scss'
})
export class EditarEspecialidadComponent {
  form: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<EditarEspecialidadComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: { duracion: number },
              private fb: FormBuilder,
              private especialidadesService: EspecialidadesService,
              private toast: NgToastService) {
      this.form = this.fb.group({
        duracion: [
          this.data.duracion ?? null,
          [Validators.required, Validators.min(5), Validators.max(60)]
        ]
      });
    }
  
  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    this.submitted = true;
    if (this.form.valid) {
      this.dialogRef.close(this.duracion.value);
    }
    else {
      this.toast.warning("El valor ingresado no es válido, debe ser un número entre 5 y 60");
    }
  }

  get duracion() {
    return this.form.get('duracion')!;
  }
}
