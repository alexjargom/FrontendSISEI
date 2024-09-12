import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVerificacionComponent } from './add-verificacion.component';

describe('AddVerificacionComponent', () => {
  let component: AddVerificacionComponent;
  let fixture: ComponentFixture<AddVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
