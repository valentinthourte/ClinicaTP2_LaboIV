export function distinct(array: any[]) {
    return array.filter((thing, i, arr) => arr.findIndex(t => t!.id === thing!.id) === i);
}

export function cantidadTurnosPorEspecialidades(array: any[]) {
    let cantidadPorEspecialidad = array.reduce((acc, turno) => {
        const nombreEspecialidad = turno.especialidad?.especialidad ?? 'Sin especialidad';

        if (!acc[nombreEspecialidad]) {
            acc[nombreEspecialidad] = 0;
        }

        acc[nombreEspecialidad]++;
        return acc;
    }, {} as Record<string, number>);
    return cantidadPorEspecialidad;
}

export function cantidadTurnosPorDia(array: any[]) {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    let cantidadPorDia = array.reduce((acc, turno) => {
        const fecha = new Date(turno.fecha);
        const diaNombre = diasSemana[fecha.getDay()];

        if (!acc[diaNombre]) {
            acc[diaNombre] = 0;
        }

        acc[diaNombre]++;
        return acc;
    }, {} as Record<string, number>);

    return cantidadPorDia;
}
