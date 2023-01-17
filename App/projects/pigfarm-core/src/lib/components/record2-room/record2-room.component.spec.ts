/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { Record2RoomComponent } from './record2-room.component';

describe('Record2RoomComponent', () => {
  let component: Record2RoomComponent;
  let fixture: ComponentFixture<Record2RoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Record2RoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Record2RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
