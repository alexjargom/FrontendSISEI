import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDifusionComponent } from './card-difusion.component';

describe('CardDifusionComponent', () => {
  let component: CardDifusionComponent;
  let fixture: ComponentFixture<CardDifusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDifusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDifusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
