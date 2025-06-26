import { Injectable } from '@angular/core';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  constructor() { }

  generarHorariosDefecto(): Horario[] {
    let horarios = [];
    for (let dia = 1; dia <= 5; dia++) {
      horarios.push({
        dia: dia,
        horaDesde: "08:00",
        horaHasta: "19:00",
        habilitado: true
      });
    }

    horarios.push({
      dia: 6,
      horaDesde: "08:00",
      horaHasta: "14:00",
      habilitado: true
    });

    return horarios;
  }
}

