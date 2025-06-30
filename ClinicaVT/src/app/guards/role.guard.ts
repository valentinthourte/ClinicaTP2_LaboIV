import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export const roleGuard: CanActivateFn = async (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);
  const role = await auth.obtenerRolUsuario();

  let roles = route.data['roles'] as TipoUsuario[];

  if (roles.includes(role))
    return true
  else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
