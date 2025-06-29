import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UsuariosService } from '../services/usuarios.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const usuarioService = inject(UsuariosService);
  try {
    const user = await auth.getUsuarioLogueadoSupabase();
    const userLocal = auth.getUsuarioLogueado();
    if (!user || !userLocal) {
      router.navigate(['/login']);
      return false;
    }
    auth.setUsuarioLogueado(user);
  
    return true;
  }
  catch(err: any) {
      router.navigate(['/login']);
      return false;
  }

};
