import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuejaComponent } from './card-queja.component';

describe('CardQuejaComponent', () => {
  let component: CardQuejaComponent;
  let fixture: ComponentFixture<CardQuejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardQuejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
