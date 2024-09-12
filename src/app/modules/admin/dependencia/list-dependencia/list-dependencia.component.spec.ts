import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDependenciaComponent } from './list-dependencia.component';

describe('ListDependenciaComponent', () => {
  let component: ListDependenciaComponent;
  let fixture: ComponentFixture<ListDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDependenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
