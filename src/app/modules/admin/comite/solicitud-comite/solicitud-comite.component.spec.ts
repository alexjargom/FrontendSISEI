import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudComiteComponent } from './solicitud-comite.component';

describe('SolicitudComiteComponent', () => {
  let component: SolicitudComiteComponent;
  let fixture: ComponentFixture<SolicitudComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
