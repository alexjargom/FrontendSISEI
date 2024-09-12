import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentacionComponent } from './view-documentacion.component';

describe('ViewDocumentacionComponent', () => {
  let component: ViewDocumentacionComponent;
  let fixture: ComponentFixture<ViewDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
