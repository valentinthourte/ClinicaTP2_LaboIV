import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from '../models/especialidad';

@Pipe({
  name: 'especialidad'
})
export class EspecialidadPipe implements PipeTransform {

  transform(value: Especialidad, ...args: unknown[]): string {
    return value.especialidad;
  }

}
