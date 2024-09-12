import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormatoComponent } from './list-formato.component';

describe('ListFormatoComponent', () => {
  let component: ListFormatoComponent;
  let fixture: ComponentFixture<ListFormatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFormatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
