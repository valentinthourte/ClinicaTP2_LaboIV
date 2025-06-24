import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seleccion-horario-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './seleccion-horario-modal.component.html',
  styleUrls: ['./seleccion-horario-modal.component.scss']
})
export class SeleccionHorarioModalComponent {
  @Input() horarios: string[] = [];
  @Input() visible = false;  
  @Output() cerrar = new EventEmitter<void>();
  @Output() horarioSeleccionado = new EventEmitter<string>();

  horarioActual?: string;

  seleccionarHorario() {
    if (this.horarioActual) {
      this.horarioSeleccionado.emit(this.horarioActual);
      this.cerrar.emit();
    }
  }

  cancelar() {
    this.cerrar.emit();
  }
}
