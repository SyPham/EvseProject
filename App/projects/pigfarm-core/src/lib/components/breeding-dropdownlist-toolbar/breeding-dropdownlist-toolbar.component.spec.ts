/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement ,Inject } from '@angular/core';

import { BreedingDropdownlistToolbarComponent } from './breeding-dropdownlist-toolbar.component';

describe('BreedingDropdownlistToolbarComponent', () => {
  let component: BreedingDropdownlistToolbarComponent;
  let fixture: ComponentFixture<BreedingDropdownlistToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedingDropdownlistToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedingDropdownlistToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
