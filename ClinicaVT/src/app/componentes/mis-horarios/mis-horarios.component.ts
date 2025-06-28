import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Horario } from '../../models/horario';
import { DiaHorarioPipe } from '../../pipes/dia-horario.pipe';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-mis-horarios',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatCardModule, TitleCasePipe, MatDialogActions, MatDialogContent, DiaHorarioPipe],
  templateUrl: './mis-horarios.component.html',
  styleUrl: './mis-horarios.component.scss'
})
export class MisHorariosComponent {

  protected horarios: Horario[] = []
  
  constructor(public dialogRef: MatDialogRef<MisHorariosComponent>,@Inject(MAT_DIALOG_DATA) public data: {horarios: Horario[]}, private toast: NgToastService) {
    this.horarios = data.horarios;
  }

  async guardarCambios() {
      try {
        this.validarHorariosIngresados();
        this.dialogRef.close(this.horarios);
      }
      catch(err: any) {
        this.toast.warning("Por favor, revisá que los horarios ingresados sean válidos.");
      }    
  }

  validarHorariosIngresados() {

    let horariosInvalidos = this.horarios.filter(h => !this.horariosSonValidos(h.horaDesde, h.horaHasta, h.dia));

    if (horariosInvalidos.length > 0) {
      console.warn("Horarios inválidos encontrados:", horariosInvalidos);
      throw new Error("Los horarios ingresados no son válidos. ");
    }

    return true;
  }

  horariosSonValidos(horaDesde: string, horaHasta: string, dia: number): boolean {
    const [desdeHora, desdeMin] = horaDesde.split(':').map(Number);
    const [hastaHora, hastaMin] = horaHasta.split(':').map(Number);

    const desde = new Date();
    desde.setHours(desdeHora, desdeMin, 0, 0);

    const hasta = new Date();
    hasta.setHours(hastaHora, hastaMin, 0, 0);

    if (desde >= hasta) return false;

    const inicioMin = 8;
    const finMax = dia === 6 ? 14 : 19;

    if (desdeHora < inicioMin || hastaHora > finMax) return false;

    return true;
  }

}
