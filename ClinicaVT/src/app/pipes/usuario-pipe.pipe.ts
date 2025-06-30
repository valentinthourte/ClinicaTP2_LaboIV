import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'usuarioPipe'
})
export class UsuarioPipePipe implements PipeTransform {

  transform(usuario: Usuario, ...args: unknown[]): string {
    return `${usuario.nombre} ${usuario.apellido}`
  }

}
