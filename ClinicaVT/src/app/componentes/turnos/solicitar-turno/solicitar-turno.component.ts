import { Component } from '@angular/core';
import { Especialidad } from '../../../models/especialidad';
import { SeleccionEspecialidadComponent } from './seleccion-especialidad/seleccion-especialidad.component';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { EtapaSolicitudTurno } from '../../../enums/etapa-solicitud-turno';
import { SeleccionProfesionalComponent } from './seleccion-profesional/seleccion-profesional.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Especialista } from '../../../models/especialista';
import { SeleccionDiaComponent } from './seleccion-dia/seleccion-dia.component';
@Component({
  selector: 'app-solicitar-turno',
  imports: [SeleccionEspecialidadComponent, SeleccionProfesionalComponent, SeleccionDiaComponent, SidebarAccesosComponent],
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {
  etapa: EtapaSolicitudTurno = EtapaSolicitudTurno.Especialidad;
  EtapaSolicitudTurno = EtapaSolicitudTurno;
  especialidadSeleccionada?: Especialidad;
  profesionalSeleccionado?: Especialista;
  selectedDia?: Date;

  avanzarEtapa() {
    if(this.etapa === EtapaSolicitudTurno.Especialidad) this.etapa = EtapaSolicitudTurno.Profesional;
    else if(this.etapa === EtapaSolicitudTurno.Profesional) this.etapa = EtapaSolicitudTurno.Dia;
    else if(this.etapa === EtapaSolicitudTurno.Dia) this.etapa = EtapaSolicitudTurno.Horario;
  }

  retrocederEtapa() {
    if(this.etapa === EtapaSolicitudTurno.Horario) this.etapa = EtapaSolicitudTurno.Dia;
    else if(this.etapa === EtapaSolicitudTurno.Dia) this.etapa = EtapaSolicitudTurno.Profesional;
    else if(this.etapa === EtapaSolicitudTurno.Profesional) this.etapa = EtapaSolicitudTurno.Especialidad;
  }

  onEspecialidadSeleccionada(especialidad: Especialidad) {
    this.especialidadSeleccionada = especialidad;
    this.avanzarEtapa();
  }


  onProfesionalSeleccionado(prof: Especialista) {
    this.profesionalSeleccionado = prof;
    this.avanzarEtapa();
  }


  onDiaSeleccionado(dia: Date) {
    this.selectedDia = dia;
    this.avanzarEtapa(); 
  }
}
