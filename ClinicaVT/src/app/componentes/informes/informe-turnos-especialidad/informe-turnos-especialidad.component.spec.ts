import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeTurnosEspecialidadComponent } from './informe-turnos-especialidad.component';

describe('InformeTurnosEspecialidadComponent', () => {
  let component: InformeTurnosEspecialidadComponent;
  let fixture: ComponentFixture<InformeTurnosEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeTurnosEspecialidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeTurnosEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
