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
import { SeleccionPacienteComponent } from "./seleccion-paciente/seleccion-paciente.component";
import { Paciente } from '../../../models/paciente';
import { AuthService } from '../../../services/auth/auth.service';
import { TipoUsuario } from '../../../enums/tipo-usuario.enum';
@Component({
  selector: 'app-solicitar-turno',
  imports: [SeleccionEspecialidadComponent, SeleccionProfesionalComponent, SeleccionDiaComponent, SeleccionPacienteComponent, SidebarAccesosComponent, SeleccionPacienteComponent],
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {

  etapa: EtapaSolicitudTurno = EtapaSolicitudTurno.Especialidad;
  EtapaSolicitudTurno = EtapaSolicitudTurno;
  especialidadSeleccionada?: Especialidad;
  profesionalSeleccionado?: Especialista;
  pacienteSeleccionado?: Paciente;

  constructor(private turnosService: TurnosService, private usuariosService: UsuariosService, private toast: NgToastService, private auth: AuthService) {}

  async avanzarEtapa() {

    switch(this.etapa) {
      case EtapaSolicitudTurno.Especialidad: {
        this.etapa = EtapaSolicitudTurno.Profesional
        break;
      }
      case EtapaSolicitudTurno.Profesional: {
        this.etapa = await this.auth.obtenerRolUsuario() == TipoUsuario.Administrador ? EtapaSolicitudTurno.Paciente : EtapaSolicitudTurno.Dia;
        break;
      }
      case EtapaSolicitudTurno.Paciente: {
        this.etapa = EtapaSolicitudTurno.Dia;
        break;
      }
      case EtapaSolicitudTurno.Dia: {
        this.etapa = EtapaSolicitudTurno.Horario;
        break;
      }
      
    }
  }

  async retrocederEtapa() {
    switch (this.etapa) {
      case EtapaSolicitudTurno.Horario: {
        this.etapa = EtapaSolicitudTurno.Dia;
        break;
      }
      case EtapaSolicitudTurno.Dia: {
        const rol = await this.auth.obtenerRolUsuario();
        this.etapa = rol == TipoUsuario.Administrador ? EtapaSolicitudTurno.Paciente : EtapaSolicitudTurno.Profesional;
        break;
      }
      case EtapaSolicitudTurno.Paciente: {
        this.etapa = EtapaSolicitudTurno.Profesional;
        break;
      }
      case EtapaSolicitudTurno.Profesional: {
        this.etapa = EtapaSolicitudTurno.Especialidad;
        break;
      }
    }

  }


  onEspecialidadSeleccionada(especialidad: Especialidad) {
    this.especialidadSeleccionada = especialidad;
    this.avanzarEtapa();
  }

  onProfesionalSeleccionado(prof: Especialista) {
    this.profesionalSeleccionado = prof;
    this.avanzarEtapa();
  }

  onPacienteSeleccionado(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.avanzarEtapa();
  }

  async onDiaSeleccionado(diaHora: DiaHoraTurno) {
    try {
      let paciente = this.pacienteSeleccionado === null || this.pacienteSeleccionado === undefined ? await this.usuariosService.obtenerPacienteLogueado() : this.pacienteSeleccionado!;
      await this.turnosService.crearTurno(paciente, this.especialidadSeleccionada!, this.profesionalSeleccionado!, diaHora);
      this.toast.success("Turno creado!")
      this.etapa = EtapaSolicitudTurno.Especialidad;
    }
    catch(err: any) {
      this.toast.danger(`Error al crear turno: ${err.message}`);
      console.log(err);
    }
  }
}
