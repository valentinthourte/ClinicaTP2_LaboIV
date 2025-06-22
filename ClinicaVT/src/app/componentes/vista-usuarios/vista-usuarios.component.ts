import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { RegistrarAdministradorComponent } from '../registro/registrar-administrador/registrar-administrador.component';
import { VistaPacientesComponent } from '../vista-pacientes/vista-pacientes.component';
import { VistaEspecialistasComponent } from '../vista-especialistas/vista-especialistas.component';
import { VistaAdministradoresComponent } from '../vista-administradores/vista-administradores.component';

@Component({
  selector: 'app-vista-usuarios',
  imports: [CommonModule, VistaPacientesComponent, VistaEspecialistasComponent, VistaAdministradoresComponent],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.scss'
})
export class VistaUsuariosComponent {

  solapaActiva: 'pacientes' | 'especialistas' | 'administradores' = 'pacientes';


  constructor() {}
  
}
