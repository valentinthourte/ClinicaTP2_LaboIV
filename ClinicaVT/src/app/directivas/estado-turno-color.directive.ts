import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { EstadoTurno } from '../enums/estado-turno';

@Directive({
  selector: '[appEstadoTurnoColor]'
})
export class EstadoTurnoColorDirective implements OnChanges, OnInit {
  @Input() appEstadoTurnoColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appEstadoTurnoColor']) {
      this.setBadgeClass();
    }
  }

  ngOnInit(): void {
    this.setBadgeClass();
  }

  private setBadgeClass() {
    const estado = this.appEstadoTurnoColor?.toLowerCase();
    const element = this.el.nativeElement;
    const classList = this.el.nativeElement.classList;
    classList.remove('bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-primary', 'text-dark');

    switch (estado) {
      case EstadoTurno.Pendiente:
        classList.add('bg-secondary');
        break;
      case EstadoTurno.Aceptado:
        classList.add('bg-success');
        break;
      case EstadoTurno.Cancelado:
        classList.add('bg-danger');
        break;
      case EstadoTurno.Rechazado:
        classList.add('bg-warning', 'text-dark');
        break;
      case EstadoTurno.Realizado:
        classList.add('bg-primary');
        break;
      default:
        classList.add('bg-secondary');
    }
  }
}
