/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { DisinfectionDropdownlistComponent } from './disinfection-dropdownlist.component';

describe('DisinfectionDropdownlistComponent', () => {
  let component: DisinfectionDropdownlistComponent;
  let fixture: ComponentFixture<DisinfectionDropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisinfectionDropdownlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisinfectionDropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
