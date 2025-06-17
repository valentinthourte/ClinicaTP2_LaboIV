import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { RegistrarAdministradorComponent } from '../registrar-administrador/registrar-administrador.component';

@Component({
  selector: 'app-vista-usuarios',
  imports: [CommonModule],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.scss'
})
export class VistaUsuariosComponent {

  usuarios: any[] = [];

  constructor(private dialog: MatDialog) {}

  onAgregarAdministrador() {
    this.dialog.open(RegistrarAdministradorComponent);
  }
}
