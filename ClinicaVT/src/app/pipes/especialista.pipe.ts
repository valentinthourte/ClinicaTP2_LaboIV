import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from '../models/especialista';

@Pipe({
  name: 'especialista'
})
export class EspecialistaPipe implements PipeTransform {

  transform(value: Especialista, ...args: unknown[]): string {
    return `${value.nombre} ${value.apellido}`;
  }

}
