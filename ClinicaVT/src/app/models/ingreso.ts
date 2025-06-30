import { Usuario } from "./usuario";

export interface Ingreso {
    id: string,
    created_at: Date,
    usuario: Usuario,
    usuarioId: string
}