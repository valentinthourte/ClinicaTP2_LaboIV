import { Routes } from '@angular/router';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { VistaUsuariosComponent } from './componentes/vista-usuarios/vista-usuarios.component';
import { MisTurnosComponent } from './componentes/turnos/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './componentes/turnos/solicitar-turno/solicitar-turno.component';
import { MisHorariosComponent } from './componentes/mis-horarios/mis-horarios.component';
import { TurnosAdministradorComponent } from './componentes/turnos/mis-turnos/turnos-administrador/turnos-administrador.component';
import { PacientesAtendidosComponent } from './componentes/pacientes-atendidos/pacientes-atendidos.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    {path: '', pathMatch: "full", component: LandingPageComponent},
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usuarios', component: VistaUsuariosComponent, canActivate: [authGuard]},
    {path: 'misTurnos', component: MisTurnosComponent, canActivate: [authGuard]},
    {path: 'turnos', component: TurnosAdministradorComponent, canActivate: [authGuard]},
    {path: 'solicitarTurno', component: SolicitarTurnoComponent, canActivate: [authGuard]},
    {path: 'misHorarios', component: MisHorariosComponent, canActivate: [authGuard]},
    {path: 'pacientesAtendidos', component: PacientesAtendidosComponent, canActivate: [authGuard]},
    {path: '**', component: NotFoundComponent, canActivate: [authGuard]},
];
