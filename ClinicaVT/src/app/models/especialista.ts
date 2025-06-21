import { Especialidad } from "./especialidad";

export interface Especialista {
    id: string | undefined;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    especialidad: Especialidad;
    email: string;
    urlImagen: string;
    created_at: Date | undefined;
    aprobado: boolean;
}