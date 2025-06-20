import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';

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
    private usuariosService: UsuariosService
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
      const admin = { ...this.formulario.value };
      await this.usuariosService.crearAdministrador(admin);
      this.dialogRef.close(admin);
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
