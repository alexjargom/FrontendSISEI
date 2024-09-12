import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSesionComponent } from './list-sesion.component';

describe('ListSesionComponent', () => {
  let component: ListSesionComponent;
  let fixture: ComponentFixture<ListSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
