import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegVendorComponent } from './reg-vendor.component';

describe('RegVendorComponent', () => {
  let component: RegVendorComponent;
  let fixture: ComponentFixture<RegVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegVendorComponent]
    });
    fixture = TestBed.createComponent(RegVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
