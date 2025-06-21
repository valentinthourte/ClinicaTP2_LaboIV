import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAprobadoColor]',
  standalone: true
})
export class AprobadoColorDirective implements OnChanges {
  @Input('appAprobadoColor') aprobado!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['aprobado']) {
      const colorClass = this.aprobado ? 'text-success' : 'text-danger';
      this.renderer.removeClass(this.el.nativeElement, 'text-success');
      this.renderer.removeClass(this.el.nativeElement, 'text-danger');
      this.renderer.addClass(this.el.nativeElement, colorClass);
    }
  }
}
