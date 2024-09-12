import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecomendacionComponent } from './add-recomendacion.component';

describe('AddRecomendacionComponent', () => {
  let component: AddRecomendacionComponent;
  let fixture: ComponentFixture<AddRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecomendacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
