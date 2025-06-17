import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vista-usuarios',
  imports: [CommonModule],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.scss'
})
export class VistaUsuariosComponent {

  usuarios: any[] = [];
}
