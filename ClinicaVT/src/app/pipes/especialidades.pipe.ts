import { Pipe, PipeTransform } from '@angular/core';
import { EspecialidadEspecialista } from '../models/especialidad-especialista';
import { Especialidad } from '../models/especialidad';

@Pipe({
  name: 'especialidades'
})
export class EspecialidadesPipe implements PipeTransform {

  transform(value: EspecialidadEspecialista[], ...args: unknown[]): string {
    return value.map(e => e.especialidad.especialidad).join(', ');
  }

}
