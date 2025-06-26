import { EspecialidadEspecialista } from "./especialidad-especialista";
import { Horario } from "./horario";

export interface Especialista {
    id: string | undefined;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    especialidades: EspecialidadEspecialista[];
    email: string;
    urlImagen: string;
    created_at: Date | undefined;
    aprobado: boolean;
    horarios: Horario[];
}