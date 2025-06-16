import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { NgToastModule } from 'ng-angular-popup';

import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent, MatToolbar, RouterModule, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  title = 'ClinicaVT';

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
