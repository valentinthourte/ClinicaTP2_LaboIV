import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { NgToastModule } from 'ng-angular-popup';

import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AuthService } from './services/auth/auth.service';
import { MostrarSiRolDirective } from './directivas/mostrar-si-rol.directive';
import { TipoUsuario } from './enums/tipo-usuario.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent, MatToolbar, RouterModule, MostrarSiRolDirective, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ClinicaVT';
  TipoUsuario = TipoUsuario;
  constructor(private auth: AuthService, private router: Router) { }
  async logout() {
    await this.auth.logout();
    this.router.navigate([''])
  }

  usuarioEstaLogueado() {
    let estaLogueado = this.auth.usuarioEstaLogueado();
    return estaLogueado;
  }
}
