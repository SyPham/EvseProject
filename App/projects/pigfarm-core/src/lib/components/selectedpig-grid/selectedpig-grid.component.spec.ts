/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { SelectedpigGridComponent } from './selectedpig-grid.component';

describe('SelectedpigGridComponent', () => {
  let component: SelectedpigGridComponent;
  let fixture: ComponentFixture<SelectedpigGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedpigGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedpigGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
