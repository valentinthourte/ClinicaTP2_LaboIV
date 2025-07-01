import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { NgToastModule } from 'ng-angular-popup';

import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AuthService } from './services/auth/auth.service';
import { MostrarSiRolDirective } from './directivas/mostrar-si-rol.directive';
import { TipoUsuario } from './enums/tipo-usuario.enum';
import { FooterComponent } from './componentes/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent, MatToolbar, RouterModule, MostrarSiRolDirective, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  currentYear = new Date().getFullYear();
  title = 'ClinicaVT';
  TipoUsuario = TipoUsuario;
  constructor(protected auth: AuthService, private router: Router) { }
  
  async ngOnInit() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('logout_pendiente', 'true');
    });

    const logoutPendiente = localStorage.getItem('logout_pendiente');

    if (logoutPendiente === 'true') {
      await this.auth.logout();
      localStorage.removeItem('logout_pendiente');
    }
  }
  async logout() {
    await this.auth.logout();
    this.router.navigate([''])
  }

  usuarioEstaLogueado() {
    let estaLogueado = this.auth.usuarioEstaLogueado();
    return estaLogueado;
  }

  async usuarioEstaLogueadoAsync() {
    return await this.auth.getUsuarioLogueadoSupabase() != null;
  }

  async onClickLogo() {
    let ruta = '';
    if (await this.usuarioEstaLogueadoAsync())
      ruta = 'home'
    this.router.navigate([ruta]);

  }
}
