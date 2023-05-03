/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageConfigActionComponent } from './image-config-action.component';

describe('ImageConfigActionComponent', () => {
  let component: ImageConfigActionComponent;
  let fixture: ComponentFixture<ImageConfigActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageConfigActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageConfigActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
