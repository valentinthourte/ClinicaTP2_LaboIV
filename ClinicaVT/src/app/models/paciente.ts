export interface Paciente {
    id: string | undefined;
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    obraSocial: string;
    email: string;
    password: string;
    urlImagenUno: string;
    urlImagenDos: string;
    created_at: Date | undefined;
}