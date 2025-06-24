import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDiaComponent } from './seleccion-dia.component';

describe('SeleccionDiaComponent', () => {
  let component: SeleccionDiaComponent;
  let fixture: ComponentFixture<SeleccionDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
