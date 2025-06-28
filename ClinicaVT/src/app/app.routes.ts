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

export const routes: Routes = [
    {path: '', pathMatch: "full", component: LandingPageComponent},
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usuarios', component: VistaUsuariosComponent},
    {path: 'misTurnos', component: MisTurnosComponent},
    {path: 'turnos', component: TurnosAdministradorComponent},
    {path: 'solicitarTurno', component: SolicitarTurnoComponent},
    {path: 'misHorarios', component: MisHorariosComponent},
    {path: 'pacientesAtendidos', component: PacientesAtendidosComponent},
    {path: '**', component: NotFoundComponent}
];
