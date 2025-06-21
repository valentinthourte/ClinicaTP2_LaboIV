import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { Especialista } from '../../models/especialista';
import { AprobadoColorDirective } from '../../directivas/aprobado-color.directive';
import { SpinnerService } from '../../services/shared/spinner.service';
import { NgToastService } from 'ng-angular-popup';
import { EspecialidadPipe } from '../../pipes/especialidad.pipe';

@Component({
  selector: 'app-vista-especialistas',
  standalone: true,
  imports: [CommonModule, AprobadoColorDirective, EspecialidadPipe],
  templateUrl: './vista-especialistas.component.html',
  styleUrl: './vista-especialistas.component.scss'
})
export class VistaEspecialistasComponent implements OnInit {  
  especialistas: Especialista[] = [];
  constructor(private usuariosService: UsuariosService, private spinner: SpinnerService, private toast: NgToastService) {}

  async ngOnInit() {
    try {
      this.spinner.show();
      this.especialistas = await this.usuariosService.obtenerEspecialistas();
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al obtener especialistas: ${err.message}`);
    }
    finally {
      this.spinner.hide();
    }
  }

  onRechazarEspecialista(especialista: Especialista) {
    throw new Error('Method not implemented.');
  }

  async onAprobarEspecialista(especialista: Especialista) {
    try {
      this.spinner.show()
      await this.usuariosService.aprobarEspecialista(especialista);
      especialista.aprobado = true;
    }
    catch(err: any) {
      console.log(err);
      this.toast.danger(`Error al aprobar especialista: ${err.message}`)
    }
    finally {
      this.spinner.hide();
    }

  }
}
