import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionProfesionalComponent } from './seleccion-profesional.component';

describe('SeleccionProfesionalComponent', () => {
  let component: SeleccionProfesionalComponent;
  let fixture: ComponentFixture<SeleccionProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionProfesionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
