import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicFormControlComponent } from './ng-dynamic-form-control.component';

describe('NgDynamicFormControlComponent', () => {
  let component: NgDynamicFormControlComponent;
  let fixture: ComponentFixture<NgDynamicFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgDynamicFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDynamicFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
