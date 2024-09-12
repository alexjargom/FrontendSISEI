import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCargosComponent } from './add-cargos.component';

describe('AddCargosComponent', () => {
  let component: AddCargosComponent;
  let fixture: ComponentFixture<AddCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCargosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
