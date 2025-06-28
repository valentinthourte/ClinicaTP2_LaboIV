import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualHistoriaClinicaModalComponent } from './visual-historia-clinica-modal.component';

describe('VisualHistoriaClinicaModalComponent', () => {
  let component: VisualHistoriaClinicaModalComponent;
  let fixture: ComponentFixture<VisualHistoriaClinicaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualHistoriaClinicaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualHistoriaClinicaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
