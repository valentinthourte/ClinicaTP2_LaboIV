import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEspecialidadComponent } from './seleccion-especialidad.component';

describe('SeleccionEspecialidadComponent', () => {
  let component: SeleccionEspecialidadComponent;
  let fixture: ComponentFixture<SeleccionEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionEspecialidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
