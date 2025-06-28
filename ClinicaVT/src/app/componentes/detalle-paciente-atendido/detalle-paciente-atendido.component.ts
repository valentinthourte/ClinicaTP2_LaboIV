import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarAccionComponent } from '../confirmar-accion/confirmar-accion.component';
import { Paciente } from '../../models/paciente';
import { Turno } from '../../models/turno';
import { TurnosService } from '../../services/turnos.service';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';

@Component({
  selector: 'app-detalle-paciente-atendido',
  imports: [TitleCasePipe, FormsModule, CommonModule, EstadoTurnoColorDirective],
  templateUrl: './detalle-paciente-atendido.component.html',
  styleUrl: './detalle-paciente-atendido.component.scss'
})
export class DetallePacienteAtendidoComponent implements OnInit {
  turnos: Turno[] = [];
  
  constructor(public dialogRef: MatDialogRef<ConfirmarAccionComponent>, @Inject(MAT_DIALOG_DATA) public data: { paciente: Paciente },
              private turnosService: TurnosService) {}
    

  async ngOnInit(){
    this.turnos = await this.turnosService.obtenerTurnosPacientePorId(this.data.paciente.id);
    console.log(this.turnos);
    
  }

  verResenia(_t17: any) {
    
  }

  cerrar() {
    this.dialogRef.close();
  }
}
