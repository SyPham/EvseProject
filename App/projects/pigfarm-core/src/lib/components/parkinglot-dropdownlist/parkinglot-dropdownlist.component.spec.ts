/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ParkinglotDropdownlistComponent } from './parkinglot-dropdownlist.component';

describe('ParkinglotDropdownlistComponent', () => {
  let component: ParkinglotDropdownlistComponent;
  let fixture: ComponentFixture<ParkinglotDropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkinglotDropdownlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkinglotDropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
