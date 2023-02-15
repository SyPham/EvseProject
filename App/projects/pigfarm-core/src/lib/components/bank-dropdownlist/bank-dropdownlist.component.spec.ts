import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDropdownlistComponent } from './bank-dropdownlist.component';

describe('BankDropdownlistComponent', () => {
  let component: BankDropdownlistComponent;
  let fixture: ComponentFixture<BankDropdownlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDropdownlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
