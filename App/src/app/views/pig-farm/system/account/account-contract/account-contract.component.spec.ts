/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountContractComponent } from './account-contract.component';

describe('AccountContractComponent', () => {
  let component: AccountContractComponent;
  let fixture: ComponentFixture<AccountContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
