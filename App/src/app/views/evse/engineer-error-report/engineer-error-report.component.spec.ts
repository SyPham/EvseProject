/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngineerErrorReportComponent } from './engineer-error-report.component';

describe('EngineerErrorReportComponent', () => {
  let component: EngineerErrorReportComponent;
  let fixture: ComponentFixture<EngineerErrorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerErrorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineerErrorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
