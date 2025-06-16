import { Routes } from '@angular/router';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { LandingPageComponent } from './componentes/landing-page/landing-page.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [
    {path: '', pathMatch: "full", component: LandingPageComponent},
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', component: NotFoundComponent}
];
