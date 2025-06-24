import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionPacienteComponent } from './seleccion-paciente.component';

describe('SeleccionPacienteComponent', () => {
  let component: SeleccionPacienteComponent;
  let fixture: ComponentFixture<SeleccionPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
