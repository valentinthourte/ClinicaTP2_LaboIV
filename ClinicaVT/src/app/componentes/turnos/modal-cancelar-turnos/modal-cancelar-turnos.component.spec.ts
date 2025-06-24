import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelarTurnosComponent } from './modal-cancelar-turnos.component';

describe('ModalCancelarTurnosComponent', () => {
  let component: ModalCancelarTurnosComponent;
  let fixture: ComponentFixture<ModalCancelarTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCancelarTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCancelarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
