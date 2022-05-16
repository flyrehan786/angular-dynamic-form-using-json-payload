import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicComponent } from './ng-dynamic.component';

describe('NgDynamicComponent', () => {
  let component: NgDynamicComponent;
  let fixture: ComponentFixture<NgDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
