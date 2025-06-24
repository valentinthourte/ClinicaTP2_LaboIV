import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAccesosComponent } from './sidebar-accesos.component';

describe('SidebarAccesosComponent', () => {
  let component: SidebarAccesosComponent;
  let fixture: ComponentFixture<SidebarAccesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAccesosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
