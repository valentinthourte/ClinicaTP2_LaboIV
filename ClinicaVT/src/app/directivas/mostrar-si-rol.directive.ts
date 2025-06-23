import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Directive({
  selector: '[appMostrarSiRol]'
})
export class MostrarSiRolDirective {

  private rolesPermitidos: string[] = [];
 
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService // Debe tener un método para obtener el rol actual
  ) {}

  @Input()
  set appMostrarSiRol(roles: string[] | string) {
    this.viewContainer.clear();
    this.rolesPermitidos = Array.isArray(roles) ? roles : [roles];
    this.verificarRolAsync(); // llamás a la función async
  }

  private async verificarRolAsync() {
    const rolUsuario = await this.authService.obtenerRolUsuario(); // asumimos que esto devuelve un string
    if (this.rolesPermitidos.includes(rolUsuario)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
