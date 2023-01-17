/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiltinMakeorderDropdownlistComponent } from './giltin-makeorder-dropdownlist.component';

describe('GiltinMakeorderDropdownlistComponent', () => {
  let component: GiltinMakeorderDropdownlistComponent;
  let fixture: ComponentFixture<GiltinMakeorderDropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiltinMakeorderDropdownlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiltinMakeorderDropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
