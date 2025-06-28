import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialista } from '../../../../models/especialista';
import { Especialidad } from '../../../../models/especialidad';
import { UsuariosService } from '../../../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(private usuariosService: UsuariosService, private toast: NgToastService) {}

  async ngOnInit() {
    if (this.especialidad) {
      try {
        this.especialistas = await this.usuariosService.obtenerEspecialistasAprobadosPorEspecialidad(this.especialidad.id);
      }
      catch(err: any)
      {
        console.log(err);
        this.toast.danger(`Error al obtener especialistas aprobados por especialidad: ${err.message}`);
      }
    }
  }

  seleccionar(especialista: Especialista) {
    this.profesionalSeleccionado.emit(especialista);
  }
}
