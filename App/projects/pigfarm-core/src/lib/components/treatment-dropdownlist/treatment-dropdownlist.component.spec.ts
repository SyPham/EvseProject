/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { TreatmentDropdownlistComponent } from './treatment-dropdownlist.component';

describe('TreatmentDropdownlistComponent', () => {
  let component: TreatmentDropdownlistComponent;
  let fixture: ComponentFixture<TreatmentDropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentDropdownlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentDropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
