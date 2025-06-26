export const TABLA_ESPECIALISTAS = "especialistas";
export const TABLA_ESPECIALISTAS_ESPECIALIDADES = "especialistas_especialidades";
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
    `;

export const QUERY_ESPECIALISTAS = `
      id,
      nombre,
      apellido,
      edad,
      dni,
      email,
      urlImagen,
      created_at,
      aprobado,
      especialidades: especialistas_especialidades (
        especialidadId,
        duracion,
        especialidad: especialidades (
          id,
          especialidad
        )
      ),
      horarios: horarios (
        id,
        dia,
        horaDesde,
        horaHasta,
        habilitado
      )
    `;
