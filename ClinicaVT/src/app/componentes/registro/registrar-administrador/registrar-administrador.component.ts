import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../../services/usuarios.service';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-registrar-administrador',
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-administrador.component.html',
  styleUrl: './registrar-administrador.component.scss'
})
export class RegistrarAdministradorComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistrarAdministradorComponent>,
    private auth: AuthService,
    private spinner: SpinnerService,
    private toast: NgToastService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      imagen: [null, Validators.required]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.formulario.get('imagen')?.setValue(file);
      this.formulario.get('imagen')?.markAsTouched();
    }
  }

  async onSubmit() {
    if (this.formulario.valid) {
      try {
        this.spinner.show();
        let admin = this.mapAdministradorFromForm(this.formulario);
        admin = await this.auth.crearAdministrador(admin, this.formulario.get("imagen")?.value, this.formulario.get('password')?.value);
        console.log(admin);
        this.toast.success("Administrador creado exitosamente!");
        this.dialogRef.close(admin);
      }
      catch(err: any) {
        console.log(`Error creando especialista: ${err}`);
        this.toast.danger(`Error creando especialista: ${err}`);
      }
      finally {
        this.spinner.hide();
      }
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  mapAdministradorFromForm(form: FormGroup): any {
    return {
      nombre: form.get('nombre')!.value,
      apellido: form.get('apellido')!.value,
      edad: form.get('edad')!.value,
      dni: form.get('dni')!.value,
      email: form.get('email')!.value,
      imagen: "",
      created_at: undefined
    };
  }
}
