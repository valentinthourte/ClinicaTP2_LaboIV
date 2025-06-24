import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { Especialista } from '../../../models/especialista';
import { AuthService } from '../../../services/auth/auth.service';
import { SpinnerService } from '../../../services/shared/spinner.service';
import { Router } from '@angular/router';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { EspecialidadPipe } from "../../../pipes/especialidad.pipe";
import { TipoUsuario } from '../../../enums/tipo-usuario.enum';
@Component({
  selector: 'app-registro-especialistas',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RecaptchaModule, RecaptchaFormsModule, EspecialidadPipe],
  templateUrl: './registro-especialistas.component.html',
  styleUrl: './registro-especialistas.component.scss'
})
export class RegistroEspecialistasComponent implements OnInit {
  formulario: FormGroup;
  especialidades: Especialidad[] = [];
  especialidadesSeleccionadas: string[] = [];
  especialidadSeleccionada: string = '';
  nuevaEspecialidad: string = '';
  token: boolean = false;

  constructor(private spinner: SpinnerService,
     private fb: FormBuilder,
      private toast: NgToastService,
      private auth: AuthService,
      private router: Router,
      private especialidadesService: EspecialidadesService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      dni: ['', Validators.required],
      especialidades: this.fb.array([], Validators.required),
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      imagen: [null, Validators.required]
    });
  }

  async ngOnInit() {
    this.especialidades = await this.especialidadesService.obtenerEspecialidades();
  }

  async agregarEspecialidad() {
    const nueva = this.nuevaEspecialidad.trim();
    if (nueva && this.especialidadExiste(nueva) == false) {
      let especialidad = await this.especialidadesService.crearEspecialidad(nueva);
      this.especialidades.push(especialidad);
      this.especialidadesSeleccionadas.push(especialidad.id);
      this.formulario.get('especialidad')?.setValue(especialidad);
      this.nuevaEspecialidad = '';
    }
  }

  especialidadExiste(nueva: string) {
    return this.especialidades.filter(s => s.especialidad == nueva).length > 0;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      let imagen = this.formulario.get('imagen'); 
      imagen?.setValue(file);
      imagen?.markAsTouched();
    }
  }

  async onSubmit() {
    if (this.token) {
      if (this.formulario.invalid || !this.obtenerImagenSeleccionada()) {
        this.formulario.markAllAsTouched();
        this.toast.warning("Por favor completá todos los campos obligatorios, incluida la imagen.");
        return;
      }
      else {
        this.spinner.show();
        try {
          const data = await this.auth.registrarse(this.formulario.get('email')!.value, this.formulario.get('password')!.value, TipoUsuario.Especialista);

          try {
            let especialista = this.mapEspecialistaFromForm(this.formulario);
            especialista.id = data.user?.id;
            await this.auth.registrarEspecialista(especialista, this.formulario.get("imagen")?.value, this.especialidadesSeleccionadas);
            this.toast.success("Especialista registrado!");
              if (data.session) {
              this.auth.guardarUsuarioLogueado(especialista);
              this.router.navigate(["/home"]);
            }
            else {
              this.toast.info("Debe confirmar el correo electrónico para ingresar");
              this.router.navigate(["/login"]);
            }
          }
          catch(err) {
            this.spinner.hide();
            this.toast.danger((err as Error).message, "Error al registrar especialista.", 5000);
            console.log(err);
          }
            
        }
        catch(err) {
          this.spinner.hide();
          this.toast.danger((err as Error).message, "Error al registrar especialista.", 5000);
          console.log(err);
          
        }   
        this.spinner.hide();
      }
    }
    else {
      this.toast.warning("Verifica que no eres un robot!");
    }
  }
  obtenerImagenSeleccionada() {
    return this.formulario.get("imagen")?.value;
  }

  mapEspecialistaFromForm(form: FormGroup): any {
      return {
      nombre: form.get('nombre')!.value,
      apellido: form.get('apellido')!.value,
      edad: form.get('edad')!.value,
      dni: form.get('dni')!.value,
      email: form.get('email')!.value,
      urlImagen: "",
      id: "",
      created_at: undefined,
      aprobado: false
    };
  }

  executeRecaptchaVisible(token:any) {
    this.token = !this.token;
    console.log(this.token);
  }

get especialidadesFormArray() {
  return this.formulario.get('especialidades') as FormArray;
}

  agregarEspecialidadSeleccionada() {
    const id = this.especialidadSeleccionada;
    if (id && !this.especialidadesSeleccionadas.includes(id)) {
      this.especialidadesSeleccionadas.push(id);
      this.especialidadesFormArray.push(this.fb.control(id));
      this.especialidadSeleccionada = '';
    }
  }

  eliminarEspecialidad(id: string) {
    this.especialidadesSeleccionadas = this.especialidadesSeleccionadas.filter(e => e !== id);
    const index = this.especialidadesFormArray.controls.findIndex(c => c.value === id);
    if (index >= 0) {
      this.especialidadesFormArray.removeAt(index);
    }
  }

  obtenerNombreEspecialidad(id: string): string {
    const esp = this.especialidades.find(e => e.id === id);
      return esp ? esp.especialidad : 'Especialidad';
  }
}
