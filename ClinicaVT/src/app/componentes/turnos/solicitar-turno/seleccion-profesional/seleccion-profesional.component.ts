import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialista } from '../../../../models/especialista';
import { Especialidad } from '../../../../models/especialidad';
import { UsuariosService } from '../../../../services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccion-profesional',
  imports: [CommonModule],
  templateUrl: './seleccion-profesional.component.html',
  styleUrls: ['./seleccion-profesional.component.scss']
})
export class SeleccionProfesionalComponent implements OnInit {
  @Input() especialidad!: Especialidad;
  @Output() profesionalSeleccionado = new EventEmitter<Especialista>();

  especialistas: Especialista[] = [];

  constructor(private usuariosService: UsuariosService) {}

  async ngOnInit() {
    if (this.especialidad) {
      this.especialistas = await this.usuariosService.obtenerEspecialistasAprobadosPorEspecialidad(this.especialidad.id);
    }
  }

  seleccionar(especialista: Especialista) {
    this.profesionalSeleccionado.emit(especialista);
  }
}
