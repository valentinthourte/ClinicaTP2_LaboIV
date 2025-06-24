// seleccion-dia.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialista } from '../../../../models/especialista';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccion-dia',
  imports: [CommonModule],
  templateUrl: './seleccion-dia.component.html',
})
export class SeleccionDiaComponent implements OnInit {
  @Input() profesional!: Especialista;
  @Output() diaSeleccionado = new EventEmitter<Date>();

  diasDisponibles: Date[] = [];
  seleccionado?: Date;

  ngOnInit() {
    this.generarDiasDisponibles();
  }

  generarDiasDisponibles() {
    const hoy = new Date();
    this.diasDisponibles = [];

    for (let i = 0; i < 15; i++) {
      const dia = new Date();
      dia.setDate(hoy.getDate() + i);
      this.diasDisponibles.push(dia);
    }
  }

  formatearFecha(dia: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long' };
    return dia.toLocaleDateString('es-AR', opciones);
  }

  seleccionarDia(dia: Date) {
    this.seleccionado = dia;
    this.diaSeleccionado.emit(dia);
  }

  esSeleccionado(dia: Date): boolean {
    return this.seleccionado?.toDateString() === dia.toDateString();
  }
}
