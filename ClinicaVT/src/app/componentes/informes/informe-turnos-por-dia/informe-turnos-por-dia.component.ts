import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TurnosService } from '../../../services/turnos.service';
import { cantidadTurnosPorDia } from '../../../helpers/array-helper';
import { ExportarPdfService } from '../../../services/exportar-pdf.service';

@Component({
  selector: 'app-informe-turnos-por-dia',
  imports: [],
  templateUrl: './informe-turnos-por-dia.component.html',
  styleUrl: './informe-turnos-por-dia.component.scss'
})
export class InformeTurnosPorDiaComponent {

 constructor(private turnosService: TurnosService, private pdfService: ExportarPdfService) {}
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

  descargarPdf() {
    let canvas = document.getElementById('turnosPorDiaChart') as HTMLCanvasElement;
    const titulo = "Turnos por día de semana";
    const subtitulo = "Informe de turnos por día de semana";
    const nombreArchivo = "informe_turnos_por_dia";
    this.pdfService.exportarGraficoPdf(canvas, subtitulo, titulo, nombreArchivo);
  }
}
