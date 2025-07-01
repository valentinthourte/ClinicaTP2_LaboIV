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
    private authService: AuthService 
  ) {}

  @Input()
  set appMostrarSiRol(roles: string[] | string) {
    this.viewContainer.clear();
    this.rolesPermitidos = Array.isArray(roles) ? roles : [roles];
    this.verificarRolAsync(); 
  }

  private async verificarRolAsync() {
    const rolUsuario = await this.authService.obtenerRolUsuario(); 
    if (this.rolesPermitidos.includes(rolUsuario)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
