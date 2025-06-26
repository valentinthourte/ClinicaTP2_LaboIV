import { EstadoTurno } from "../enums/estado-turno";
import { Especialidad } from "./especialidad";
import { Especialista } from "./especialista";
import { HistoriaClinica } from "./historia-clinica";
import { Paciente } from "./paciente";

export interface Turno {
    id: string;
    pacienteId: string;
    especialistaId: string;
    especialidadId: string;
    fecha: Date; 
    estado: EstadoTurno;
    comentarioPaciente?: string;
    comentarioEspecialista?: string;
    reseniaPaciente?: string;
    historiaClinica?: HistoriaClinica;
    hora: string;
    especialista?: Especialista;
    especialidad?: Especialidad;
    paciente?: Paciente;
}