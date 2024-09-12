import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepComiteComponent } from './step-comite.component';

describe('StepComiteComponent', () => {
  let component: StepComiteComponent;
  let fixture: ComponentFixture<StepComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
