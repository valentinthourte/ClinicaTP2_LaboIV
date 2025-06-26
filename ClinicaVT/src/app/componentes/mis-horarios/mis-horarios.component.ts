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

@Component({
  selector: 'app-mis-horarios',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatCardModule, TitleCasePipe, MatDialogActions, MatDialogContent, DiaHorarioPipe],
  templateUrl: './mis-horarios.component.html',
  styleUrl: './mis-horarios.component.scss'
})
export class MisHorariosComponent {

  protected horarios: Horario[] = []
  
  constructor(public dialogRef: MatDialogRef<MisHorariosComponent>,@Inject(MAT_DIALOG_DATA) public data: {horarios: Horario[]}) {
    this.horarios = data.horarios;
  }

  async guardarCambios() {
    this.dialogRef.close(this.horarios);
  }

}
