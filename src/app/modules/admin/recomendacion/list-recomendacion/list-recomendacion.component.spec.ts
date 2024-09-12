import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecomendacionComponent } from './list-recomendacion.component';

describe('ListRecomendacionComponent', () => {
  let component: ListRecomendacionComponent;
  let fixture: ComponentFixture<ListRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecomendacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
