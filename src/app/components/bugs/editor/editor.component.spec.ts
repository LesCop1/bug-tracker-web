import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugEditorComponent } from './editor.component';

describe('BugEditorComponent', () => {
  let component: BugEditorComponent;
  let fixture: ComponentFixture<BugEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
