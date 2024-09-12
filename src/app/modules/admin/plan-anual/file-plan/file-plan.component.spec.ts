import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePlanComponent } from './file-plan.component';

describe('FilePlanComponent', () => {
  let component: FilePlanComponent;
  let fixture: ComponentFixture<FilePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
