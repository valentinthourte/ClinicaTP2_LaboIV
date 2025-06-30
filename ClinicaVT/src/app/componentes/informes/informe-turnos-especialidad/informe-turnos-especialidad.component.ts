import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TurnosService } from '../../../services/turnos.service';
import { cantidadTurnosPorEspecialidades, distinct } from '../../../helpers/array-helper';
@Component({
  selector: 'app-informe-turnos-especialidad',
  imports: [],
  templateUrl: './informe-turnos-especialidad.component.html',
  styleUrl: './informe-turnos-especialidad.component.scss'
})
export class InformeTurnosEspecialidadComponent implements OnInit {

  constructor(private turnosService: TurnosService) {}
  async ngOnInit() {

    let turnos = await this.turnosService.obtenerTodosTurnos();
    let cantidades = cantidadTurnosPorEspecialidades(turnos);

    const ctx = document.getElementById('turnosPorEspecialidadChart') as HTMLCanvasElement;
    Chart.register(...registerables);
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(cantidades),
        datasets: [{
          label: 'Turnos por especialidad',
          data: Object.values(cantidades),
          borderWidth: 1
        }]
      }
    });
  }

}
