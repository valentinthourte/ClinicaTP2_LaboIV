import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEspecialistasComponent } from './vista-especialistas.component';

describe('VistaEspecialistasComponent', () => {
  let component: VistaEspecialistasComponent;
  let fixture: ComponentFixture<VistaEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaEspecialistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
