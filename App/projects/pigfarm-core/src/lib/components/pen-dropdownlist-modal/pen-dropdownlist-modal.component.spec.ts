/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { PenDropdownlistModalComponent } from './pen-dropdownlist-modal.component';

describe('PenDropdownlistModalComponent', () => {
  let component: PenDropdownlistModalComponent;
  let fixture: ComponentFixture<PenDropdownlistModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenDropdownlistModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenDropdownlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
