import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionHorarioModalComponent } from './seleccion-horario-modal.component';

describe('SeleccionHorarioModalComponent', () => {
  let component: SeleccionHorarioModalComponent;
  let fixture: ComponentFixture<SeleccionHorarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionHorarioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionHorarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
