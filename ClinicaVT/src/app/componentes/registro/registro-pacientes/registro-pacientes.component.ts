import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { Paciente } from '../../../models/paciente';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha-18";
import { AuthService } from '../../../services/auth/auth.service';
import { TipoUsuario } from '../../../enums/tipo-usuario.enum';
@Component({
  selector: 'app-registro-pacientes',
  imports: [ 
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule],
  templateUrl: './registro-pacientes.component.html',
  styleUrl: './registro-pacientes.component.scss'
})
export class RegistroPacientesComponent {

 formulario: FormGroup;
 protected errorMsg: string = "";
 token: boolean = false;

  constructor(private fb: FormBuilder, private spinner: SpinnerService, private toast: NgToastService, private router: Router, private auth: AuthService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      dni: ['', Validators.required],
      obraSocial: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      imagenes: this.fb.array([
        [null, Validators.required],
        [null, Validators.required]
      ])
    });
  }

  get imagenes(): FormArray {
    return this.formulario.get('imagenes') as FormArray;
  }

  async onSubmit() {
    if (this.token) {
      if (this.formulario.valid) {
        console.log('Datos del paciente:', this.formulario.value);
        this.spinner.show();
        try {
          let data = await this.auth.registrarse(this.formulario.get('email')!.value, this.formulario.get('password')!.value, TipoUsuario.Paciente);

          try {
            let paciente = this.mapFormToPaciente(this.formulario);
            paciente.id = data.user?.id;
            await this.auth.guardarPaciente(paciente, this.imagenes);
            this.toast.success("Paciente registrado!");
            if (data.session) {
              this.auth.guardarUsuarioLogueado(paciente);
              this.router.navigate(["/home"]);
            }
            else {
              this.toast.info("Debe confirmar el correo electrónico para ingresar");
              this.router.navigate(["/login"]);
            }
          }
          catch(err) {
            this.spinner.hide();
            this.toast.danger((err as Error).message, "Error al registrar paciente.", 5000);
          }
          
          this.spinner.hide();
        }
        catch(err) {
          this.spinner.hide();
          this.toast.danger((err as Error).message, "Error al registrar paciente.", 5000);
        }
      } else {
        this.logControlesInvalidos(this.formulario);
        this.formulario.markAllAsTouched();
        this.toast.warning("Por favor completá todos los campos obligatorios, incluida la imagen.");
      }
    }
    else {
      this.toast.warning("Verifica que no eres un robot!");
    }
    
  }

  logControlesInvalidos(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.invalid) {
        console.warn(`Control inválido: ${key}`, control.errors);
      }
    });
  } 

  onFileChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.imagenes.at(index).setValue(file);
      this.imagenes.at(index).markAsTouched();
      this.validarImagenesDistintas();
    }
  } 

  validarImagenesDistintas(): void {
    const file1 = this.imagenes.at(0).value;
    const file2 = this.imagenes.at(1).value;

    if (file1 && file2 && file1.name === file2.name && file1.size === file2.size) {
      this.imagenes.setErrors({ repetidas: true });
    } else {
      this.imagenes.setErrors(null);
    }
  }

  private mapFormToPaciente(form: FormGroup): Paciente {
    return {
      nombre: form.get('nombre')!.value,
      apellido: form.get('apellido')!.value,
      edad: form.get('edad')!.value,
      dni: form.get('dni')!.value,
      obraSocial: form.get('obraSocial')!.value,
      email: form.get('email')!.value,
      password: form.get('password')!.value,
      urlImagenDos: "",
      urlImagenUno: "",
      id: "",
      created_at: undefined
    };
  }

  executeRecaptchaVisible(token:any)
  {
    this.token = !this.token;

    console.log(this.token);
  }

}
