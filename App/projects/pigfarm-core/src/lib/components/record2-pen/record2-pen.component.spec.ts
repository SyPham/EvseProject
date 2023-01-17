/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { Record2PenComponent } from './record2-pen.component';

describe('Record2PenComponent', () => {
  let component: Record2PenComponent;
  let fixture: ComponentFixture<Record2PenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Record2PenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Record2PenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
