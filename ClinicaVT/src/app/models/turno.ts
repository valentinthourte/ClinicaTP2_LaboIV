import { EstadoTurno } from "../enums/estado-turno";
import { HistoriaClinica } from "./historia-clinica";

export interface Turno {
    id: string;
    pacienteId: string;
    especialistaId: string;
    especialidad: string;
    fecha: Date; 
    estado: EstadoTurno;
    comentarioPaciente?: string;
    comentarioEspecialista?: string;
    reseniaPaciente?: string;
    historiaClinica?: HistoriaClinica;
}