import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Especialista } from '../../../../models/especialista';
import { TurnosService } from '../../../../services/turnos.service';
import { Especialidad } from '../../../../models/especialidad';

@Component({
  selector: 'app-seleccion-horario-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './seleccion-horario-modal.component.html',
  styleUrls: ['./seleccion-horario-modal.component.scss']
})
export class SeleccionHorarioModalComponent implements OnInit {
  @Input() horarios: string[] = [];
  @Output() horarioSeleccionado = new EventEmitter<string>();
  horarioActual?: string;

  constructor(public dialogRef: MatDialogRef<SeleccionHorarioModalComponent>,@Inject(MAT_DIALOG_DATA) public data: {especialista: Especialista, dia: Date, especialidad: Especialidad}, private turnosService: TurnosService) {}
  
  async ngOnInit() {
    console.log(this.data);
    this.horarios = await this.turnosService.obtenerHorariosEspecialistaParaDia(this.data.especialista, this.data.dia, this.data.especialidad);
  }
    
  seleccionarHorario() {
    if (this.horarioActual) {
      this.horarioSeleccionado.emit(this.horarioActual);
      this.dialogRef.close(this.horarioActual);
    }
  }

  cancelar() {
      this.dialogRef.close(this.horarioActual);
  }
}
