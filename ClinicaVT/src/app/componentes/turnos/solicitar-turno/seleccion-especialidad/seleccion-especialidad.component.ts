import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EspecialidadesService } from '../../../../services/especialidades.service';
import { Especialidad } from '../../../../models/especialidad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccion-especialidad',
  imports: [CommonModule],
  templateUrl: './seleccion-especialidad.component.html',
  styleUrls: ['./seleccion-especialidad.component.scss']
})
export class SeleccionEspecialidadComponent implements OnInit {
  especialidades: Especialidad[] = [];
  @Output() especialidadSeleccionada = new EventEmitter<Especialidad>();

  constructor(private especialidadesService: EspecialidadesService) {}

  async ngOnInit() {
    this.especialidades = await this.especialidadesService.obtenerEspecialidades();
  }

  seleccionarEspecialidad(esp: Especialidad) {
    console.log(`Especialidad seleccionada: ${esp.especialidad}`);
    
    this.especialidadSeleccionada.emit(esp);
  }
}
