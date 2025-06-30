import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosAlSistemaModalComponent } from './ingresos-al-sistema-modal.component';

describe('IngresosAlSistemaModalComponent', () => {
  let component: IngresosAlSistemaModalComponent;
  let fixture: ComponentFixture<IngresosAlSistemaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresosAlSistemaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosAlSistemaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
