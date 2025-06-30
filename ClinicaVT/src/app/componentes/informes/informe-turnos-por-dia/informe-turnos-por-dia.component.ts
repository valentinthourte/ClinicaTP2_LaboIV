import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TurnosService } from '../../../services/turnos.service';
import { cantidadTurnosPorDia } from '../../../helpers/array-helper';

@Component({
  selector: 'app-informe-turnos-por-dia',
  imports: [],
  templateUrl: './informe-turnos-por-dia.component.html',
  styleUrl: './informe-turnos-por-dia.component.scss'
})
export class InformeTurnosPorDiaComponent {
 constructor(private turnosService: TurnosService) {}
  async ngOnInit() {

    let turnos = await this.turnosService.obtenerTodosTurnos();
    let cantidades = cantidadTurnosPorDia(turnos);



    const ctx = document.getElementById('turnosPorDiaChart') as HTMLCanvasElement;
    Chart.register(...registerables);
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(cantidades),
        datasets: [{
          label: 'Turnos por día',
          data: Object.values(cantidades),
          borderWidth: 1
        }]
      }
    });
  }
}
