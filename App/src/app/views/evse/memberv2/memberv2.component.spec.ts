/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Memberv2Component } from './memberv2.component';

describe('Memberv2Component', () => {
  let component: Memberv2Component;
  let fixture: ComponentFixture<Memberv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Memberv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Memberv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
