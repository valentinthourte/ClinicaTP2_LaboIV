import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaHorario'
})
export class DiaHorarioPipe implements PipeTransform {

  private dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  transform(value: number, ...args: unknown[]): string {
    return this.dias[value];
  }

}
