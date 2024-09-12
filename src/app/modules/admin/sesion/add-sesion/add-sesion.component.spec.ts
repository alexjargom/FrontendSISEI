import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSesionComponent } from './add-sesion.component';

describe('AddSesionComponent', () => {
  let component: AddSesionComponent;
  let fixture: ComponentFixture<AddSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
