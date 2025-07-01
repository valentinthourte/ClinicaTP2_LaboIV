import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { RegistrarAdministradorComponent } from '../registro/registrar-administrador/registrar-administrador.component';
import { VistaPacientesComponent } from '../vista-pacientes/vista-pacientes.component';
import { VistaEspecialistasComponent } from '../vista-especialistas/vista-especialistas.component';
import { VistaAdministradoresComponent } from '../vista-administradores/vista-administradores.component';
import { UsuariosService } from '../../services/usuarios.service';
import { ExportarExcelService } from '../../services/exportar-excel.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { scaleInOut } from '../../animations/scale-in-out';

@Component({
  selector: 'app-vista-usuarios',
  imports: [CommonModule, VistaPacientesComponent, VistaEspecialistasComponent, VistaAdministradoresComponent],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.scss',
  animations: [scaleInOut]
})

export class VistaUsuariosComponent {
  solapaActiva = 'pacientes';
  componenteVisible: string | null = 'pacientes';
  animando = false;

  constructor(private usuariosService: UsuariosService, private excelService: ExportarExcelService) {}

  async descargarTodosUsuarios() {
    let administradores = await this.usuariosService.obtenerAdministradores();
    let especialistas = await this.usuariosService.obtenerEspecialistas();
    let pacientes = await this.usuariosService.obtenerPacientes();

    let usuarios = [];
    for (const admin of administradores) {
        usuarios.push({
          Tipo: 'Administrador',
          Nombre: admin.nombre || 'N/A',
          Apellido: admin.apellido || 'N/A',
          Email: admin.email || 'N/A',
          DNI: admin.dni || 'N/A'
        });
      }

      for (const esp of especialistas) {
        usuarios.push({
          Tipo: 'Especialista',
          Nombre: esp.nombre || 'N/A',
          Apellido: esp.apellido || 'N/A',
          Email: esp.email || 'N/A',
          DNI: esp.dni || 'N/A'
        });
      }

      for (const pac of pacientes) {
        usuarios.push({
          Tipo: 'Paciente',
          Nombre: pac.nombre || 'N/A',
          Apellido: pac.apellido || 'N/A',
          Email: pac.email || 'N/A',
          DNI: pac.dni || 'N/A'
        });
      }

      this.excelService.exportarAExcel(usuarios, "Listado de usuarios", "listado_todos_usuarios");
  }

  cambiarSolapa(nueva: string) {
    if (this.animando || nueva === this.solapaActiva) return;

    this.animando = true;
    const anterior = this.solapaActiva;
    this.solapaActiva = nueva;

    setTimeout(() => {
      this.componenteVisible = nueva;
      this.animando = false;
    }, 400); 
  }

  
}
