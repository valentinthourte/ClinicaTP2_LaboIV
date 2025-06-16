import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-especialistas',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro-especialistas.component.html',
  styleUrl: './registro-especialistas.component.scss'
})
export class RegistroEspecialistasComponent {
    formulario: FormGroup;
  especialidades: string[] = ['Cardiología', 'Dermatología', 'Pediatría'];
  nuevaEspecialidad: string = '';
  imagenSeleccionada: File | null = null;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      dni: ['', Validators.required],
      especialidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  agregarEspecialidad() {
    const nueva = this.nuevaEspecialidad.trim();
    if (nueva && !this.especialidades.includes(nueva)) {
      this.especialidades.push(nueva);
      this.formulario.get('especialidad')?.setValue(nueva);
      this.nuevaEspecialidad = '';
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.imagenSeleccionada = input.files?.[0] || null;
  }

  onSubmit() {
    if (this.formulario.invalid || !this.imagenSeleccionada) {
      this.formulario.markAllAsTouched();
      alert("Por favor completá todos los campos obligatorios, incluida la imagen.");
      return;
    }

    const datos = {
      ...this.formulario.value,
      imagen: this.imagenSeleccionada
    };

    console.log("Especialista registrado:", datos);
  }
}
