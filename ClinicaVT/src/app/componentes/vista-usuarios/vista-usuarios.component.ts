import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { RegistrarAdministradorComponent } from '../registrar-administrador/registrar-administrador.component';
import { VistaPacientesComponent } from '../vista-pacientes/vista-pacientes.component';
import { VistaEspecialistasComponent } from '../vista-especialistas/vista-especialistas.component';

@Component({
  selector: 'app-vista-usuarios',
  imports: [CommonModule, VistaPacientesComponent, VistaEspecialistasComponent],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.scss'
})
export class VistaUsuariosComponent {

  solapaActiva: 'pacientes' | 'especialistas' = 'pacientes';


  constructor(private dialog: MatDialog) {}

  onAgregarAdministrador() {
    this.dialog.open(RegistrarAdministradorComponent);
  }
  
}
