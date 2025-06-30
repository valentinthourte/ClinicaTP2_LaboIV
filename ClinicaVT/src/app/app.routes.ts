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
import { UnauthorizedComponent } from './componentes/unauthorized/unauthorized.component';
import { roleGuard } from './guards/role.guard';
import { TipoUsuario } from './enums/tipo-usuario.enum';

export const routes: Routes = [
    {path: '', pathMatch: "full", component: LandingPageComponent},
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard, roleGuard], data: { roles: [TipoUsuario.Administrador, TipoUsuario.Paciente, TipoUsuario.Especialista]}},
    {path: 'usuarios', component: VistaUsuariosComponent, canActivate: [authGuard, roleGuard], data: { roles: [TipoUsuario.Administrador]}},
    {path: 'misTurnos', component: MisTurnosComponent, canActivate: [authGuard, roleGuard], data: { roles: [TipoUsuario.Paciente, TipoUsuario.Especialista]}},
    {path: 'turnos', component: TurnosAdministradorComponent, canActivate: [authGuard, roleGuard], data: { roles: [TipoUsuario.Administrador]}},
    {path: 'solicitarTurno', component: SolicitarTurnoComponent, canActivate: [authGuard, roleGuard], data: { roles: [TipoUsuario.Administrador, TipoUsuario.Paciente]}},
    {path: 'misHorarios', component: MisHorariosComponent, canActivate: [authGuard, roleGuard], data: { roles: [TipoUsuario.Especialista]}},
    {path: 'pacientesAtendidos', component: PacientesAtendidosComponent, canActivate: [authGuard, roleGuard], data: { roles: [TipoUsuario.Especialista]}},
    {path: 'unauthorized', component: UnauthorizedComponent, canActivate: [authGuard]},
    {path: '**', component: NotFoundComponent, canActivate: [authGuard]},
];
