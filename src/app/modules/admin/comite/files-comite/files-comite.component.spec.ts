import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesComiteComponent } from './files-comite.component';

describe('FilesComiteComponent', () => {
  let component: FilesComiteComponent;
  let fixture: ComponentFixture<FilesComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
