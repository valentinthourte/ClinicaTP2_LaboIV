import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-crear-especialidad',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crear-especialidad.component.html',
  styleUrl: './crear-especialidad.component.scss'
})
export class CrearEspecialidadComponent {
  formEspecialidad!: FormGroup;
  imagenFile?: File;
  imagenInvalida = false;
  imagenTocada = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearEspecialidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { especialidades: Especialidad[] },
    private especialidadesService: EspecialidadesService,
    private spinner: SpinnerService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.formEspecialidad = this.fb.group({
      nombre: ['', [Validators.required, this.nombreUnicoValidator(this.data.especialidades)]]
    });
  }

  get nombre() {
    return this.formEspecialidad.get('nombre')!;
  }

  nombreUnicoValidator(especialidades: Especialidad[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nombreIngresado = control.value?.trim().toLowerCase();
      const existe = especialidades.some(e => e.especialidad.trim().toLowerCase() === nombreIngresado);
      return existe ? { nombreDuplicado: true } : null;
    };
  }
  cancelar() {
    this.dialogRef.close();
  }

  async guardar() {
    if (this.formEspecialidad.invalid || this.imagenInvalida) {
      this.formEspecialidad.markAllAsTouched();
      return;
    }
    else {
      try {
        debugger
        this.spinner.show();
        let especialidad = await this.especialidadesService.crearEspecialidad(this.nombre.value.trim());
        this.toast.success("Especialidad creada!");
        this.dialogRef.close(especialidad);
      }
      catch(err: any) {
        this.toast.danger(`Error al crear especialidad: ${err.message}`);
      }
      finally {
        this.spinner.hide();
      }
    }
  }

}
