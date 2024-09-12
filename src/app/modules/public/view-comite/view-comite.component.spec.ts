import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComiteComponent } from './view-comite.component';

describe('ViewComiteComponent', () => {
  let component: ViewComiteComponent;
  let fixture: ComponentFixture<ViewComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
