import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesPlanComponent } from './actividades-plan.component';

describe('ActividadesPlanComponent', () => {
  let component: ActividadesPlanComponent;
  let fixture: ComponentFixture<ActividadesPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
