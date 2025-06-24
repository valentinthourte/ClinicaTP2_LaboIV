import { Component } from '@angular/core';
import { Especialidad } from '../../../models/especialidad';
import { SeleccionEspecialidadComponent } from './seleccion-especialidad/seleccion-especialidad.component';
import { SidebarAccesosComponent } from '../../sidebar-accesos/sidebar-accesos.component';
import { EtapaSolicitudTurno } from '../../../enums/etapa-solicitud-turno';
import { SeleccionProfesionalComponent } from './seleccion-profesional/seleccion-profesional.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Especialista } from '../../../models/especialista';
import { SeleccionDiaComponent } from './seleccion-dia/seleccion-dia.component';
import { DiaHoraTurno } from '../../../models/dia-hora-turno';
import { TurnosService } from '../../../services/turnos.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(private turnosService: TurnosService, private usuariosService: UsuariosService, private toast: NgToastService) {}

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

  async onDiaSeleccionado(diaHora: DiaHoraTurno) {
    try {
      let paciente = await this.usuariosService.obtenerPacienteLogueado();
      await this.turnosService.crearTurno(paciente, this.especialidadSeleccionada!, this.profesionalSeleccionado!, diaHora);
      this.toast.success("Turno creado!")
      this.etapa = EtapaSolicitudTurno.Especialidad;
    }
    catch(err: any) {
      this.toast.danger(`Error al crear turno: ${err.message}`);
    }
  }
}
