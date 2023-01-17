/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { MakeorderDropdownlistToolbarComponent } from './makeorder-dropdownlist-toolbar.component';

describe('MakeorderDropdownlistToolbarComponent', () => {
  let component: MakeorderDropdownlistToolbarComponent;
  let fixture: ComponentFixture<MakeorderDropdownlistToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeorderDropdownlistToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeorderDropdownlistToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
