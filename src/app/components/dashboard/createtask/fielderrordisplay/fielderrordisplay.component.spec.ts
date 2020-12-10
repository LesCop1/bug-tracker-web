import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorDisplayComponentComponent } from './fielderrordisplay.component';

describe('FieldErrorDisplayComponentComponent', () => {
  let component: FieldErrorDisplayComponentComponent;
  let fixture: ComponentFixture<FieldErrorDisplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldErrorDisplayComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldErrorDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
