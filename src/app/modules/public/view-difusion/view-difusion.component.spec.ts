import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDifusionComponent } from './view-difusion.component';

describe('ViewDifusionComponent', () => {
  let component: ViewDifusionComponent;
  let fixture: ComponentFixture<ViewDifusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDifusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDifusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
