import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgReactiveFormComponent } from './ng-reactive-form.component';

describe('NgReactiveFormComponent', () => {
  let component: NgReactiveFormComponent;
  let fixture: ComponentFixture<NgReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
