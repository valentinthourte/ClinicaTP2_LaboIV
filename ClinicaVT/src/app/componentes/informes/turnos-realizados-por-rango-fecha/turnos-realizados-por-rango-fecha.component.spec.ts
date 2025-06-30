import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosRealizadosPorRangoFechaComponent } from './turnos-realizados-por-rango-fecha.component';

describe('TurnosRealizadosPorRangoFechaComponent', () => {
  let component: TurnosRealizadosPorRangoFechaComponent;
  let fixture: ComponentFixture<TurnosRealizadosPorRangoFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosRealizadosPorRangoFechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosRealizadosPorRangoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
