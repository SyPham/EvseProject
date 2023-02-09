/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PigfarmRichtexteditorComponent } from './pigfarm-richtexteditor.component';

describe('PigfarmRichtexteditorComponent', () => {
  let component: PigfarmRichtexteditorComponent;
  let fixture: ComponentFixture<PigfarmRichtexteditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigfarmRichtexteditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigfarmRichtexteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
