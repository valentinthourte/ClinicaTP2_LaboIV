import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TurnosService } from '../../../services/turnos.service';
import { cantidadTurnosPorEspecialidades, distinct } from '../../../helpers/array-helper';
import { ExportarPdfService } from '../../../services/exportar-pdf.service';
@Component({
  selector: 'app-informe-turnos-especialidad',
  imports: [],
  templateUrl: './informe-turnos-especialidad.component.html',
  styleUrl: './informe-turnos-especialidad.component.scss'
})
export class InformeTurnosEspecialidadComponent implements OnInit {


  constructor(private turnosService: TurnosService, private pdfService: ExportarPdfService) {}
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

  async descargarPdf() {
    let canvas = document.getElementById('turnosPorEspecialidadChart') as HTMLCanvasElement;
    const titulo = "Turnos por especialidad";
    const subtitulo = "Informe de turnos por especialidad";
    const nombreArchivo = "informe_turnos_por_especialidad";
    this.pdfService.exportarGraficoPdf(canvas, subtitulo, titulo, nombreArchivo);
  }

}
