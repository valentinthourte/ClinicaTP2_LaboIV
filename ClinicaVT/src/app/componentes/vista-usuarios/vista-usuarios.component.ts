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

@Component({
  selector: 'app-vista-usuarios',
  imports: [CommonModule, VistaPacientesComponent, VistaEspecialistasComponent, VistaAdministradoresComponent],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.scss'
})
export class VistaUsuariosComponent {
  solapaActiva: 'pacientes' | 'especialistas' | 'administradores' = 'pacientes';
  ultimaSolapaActiva: typeof this.solapaActiva = 'pacientes';

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


  getDireccion(): 'izquierda' | 'derecha' {
    const orden = ['pacientes', 'especialistas', 'administradores'];
    const anterior = orden.indexOf(this.ultimaSolapaActiva);
    const actual = orden.indexOf(this.solapaActiva);
    return actual > anterior ? 'izquierda' : 'derecha';
  }

  cambiarSolapa(nueva: typeof this.solapaActiva) {
    this.ultimaSolapaActiva = this.solapaActiva;
    this.solapaActiva = nueva;
  }
  
}
