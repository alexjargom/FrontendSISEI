import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDifusionComponent } from './ver-difusion.component';

describe('VerDifusionComponent', () => {
  let component: VerDifusionComponent;
  let fixture: ComponentFixture<VerDifusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDifusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDifusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
