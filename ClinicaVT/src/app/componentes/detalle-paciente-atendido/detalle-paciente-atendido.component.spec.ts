import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePacienteAtendidoComponent } from './detalle-paciente-atendido.component';

describe('DetallePacienteAtendidoComponent', () => {
  let component: DetallePacienteAtendidoComponent;
  let fixture: ComponentFixture<DetallePacienteAtendidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePacienteAtendidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePacienteAtendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
