import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComiteComponent } from './add-comite.component';

describe('AddComiteComponent', () => {
  let component: AddComiteComponent;
  let fixture: ComponentFixture<AddComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
