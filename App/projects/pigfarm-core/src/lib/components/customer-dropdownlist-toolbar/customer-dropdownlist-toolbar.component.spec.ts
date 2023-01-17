/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { CustomerDropdownlistToolbarComponent } from './customer-dropdownlist-toolbar.component';

describe('CustomerDropdownlistToolbarComponent', () => {
  let component: CustomerDropdownlistToolbarComponent;
  let fixture: ComponentFixture<CustomerDropdownlistToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDropdownlistToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDropdownlistToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
