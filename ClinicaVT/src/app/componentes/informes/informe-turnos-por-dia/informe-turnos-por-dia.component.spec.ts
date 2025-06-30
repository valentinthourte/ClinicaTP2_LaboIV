import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeTurnosPorDiaComponent } from './informe-turnos-por-dia.component';

describe('InformeTurnosPorDiaComponent', () => {
  let component: InformeTurnosPorDiaComponent;
  let fixture: ComponentFixture<InformeTurnosPorDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeTurnosPorDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeTurnosPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
