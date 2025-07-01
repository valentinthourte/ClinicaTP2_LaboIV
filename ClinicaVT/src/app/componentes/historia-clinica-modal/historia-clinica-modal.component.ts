import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-historia-clinica-modal',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './historia-clinica-modal.component.html',
  styleUrls: ['./historia-clinica-modal.component.scss'],
})
export class HistoriaClinicaModalComponent implements OnInit {

  historiaForm!: FormGroup;

  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<HistoriaClinicaModalComponent>, private toast: NgToastService) {}

  ngOnInit(): void {
    this.historiaForm = this.fb.group({
      altura: ['', Validators.required],
      peso: [null, [Validators.required, Validators.min(0)]],
      temperatura: [null, [Validators.required, Validators.min(30), Validators.max(50)]],
      presion: ['', [Validators.required, Validators.pattern(/^\d{1,3}\/\d{1,3}$/)]],
      datosDinamicos: this.fb.array([]),
    });

    this.agregarCampo(); 
  }
  get altura() {
    return this.historiaForm.get('altura');
  }
  get peso() {
    return this.historiaForm.get('peso');
  }
  get temperatura() {
    return this.historiaForm.get('temperatura');
  }
  get presion() {
    return this.historiaForm.get('presion');
  }
  

  get datosDinamicos(): FormArray {
    return this.historiaForm.get('datosDinamicos') as FormArray;
  }

  agregarCampo(): void {
    if (this.datosDinamicos.length < 3) {
      this.datosDinamicos.push(
        this.fb.group({
          clave: ['', Validators.required],
          valor: ['', Validators.required],
        })
      );
    }
  }

  eliminarCampo(index: number): void {
    this.datosDinamicos.removeAt(index);
  }

  onSubmit(): void {
    if (this.historiaForm.valid) {
      let historia = {
        altura: this.altura!.value,
        peso: this.peso!.value,
        temperatura: this.temperatura!.value,
        presion: this.presion!.value,
        adicionales: this.datosDinamicos.value
      }

      this.dialogRef.close(historia);
    } else {
      this.historiaForm.markAllAsTouched();
      let controlesInvalidos = this.obtenerControlesInvalidos(this.historiaForm);
      this.toast.warning(`Por favor, revisá los siguientes controles: ${controlesInvalidos.join(', ')}`);
    }
  }

  obtenerControlesInvalidos(form: FormGroup) {
    let controlesInvalidos: string[] = [];
     Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.valid == false) {
        controlesInvalidos.push(`${key}: ${control.value}`);
      }
    });
    return controlesInvalidos;
  }

  cancelar() {
    this.dialogRef.close();
  }
}
