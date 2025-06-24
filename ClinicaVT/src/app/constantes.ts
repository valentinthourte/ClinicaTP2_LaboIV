export const TABLA_ESPECIALISTAS = "especialistas";
export const TABLA_PACIENTES = "pacientes";
export const TABLA_ESPECIALIDADES = "especialidades";
export const TABLA_ADMINISTRADORES = "administradores";
export const TABLA_TURNOS = "turnos";


export const CONSULTA_TURNOS = `
      *,
      especialista:especialistas (
        id,
        nombre,
        apellido,
        email,
        urlImagen,
        aprobado
      ),
      especialidad:especialidades (
        id,
        especialidad
      ),
      paciente:pacientes (
        id,
        nombre,
        apellido,
        email,
        edad,
        dni,
        obraSocial,
        urlImagenUno,
        urlImagenDos,
        created_at
      )
    `

