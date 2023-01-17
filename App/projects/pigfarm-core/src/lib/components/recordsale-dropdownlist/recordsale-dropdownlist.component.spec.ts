/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { RecordsaleDropdownlistComponent } from './recordsale-dropdownlist.component';

describe('RecordsaleDropdownlistComponent', () => {
  let component: RecordsaleDropdownlistComponent;
  let fixture: ComponentFixture<RecordsaleDropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsaleDropdownlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsaleDropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
