import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegStudentComponent } from './reg-student.component';

describe('RegStudentComponent', () => {
  let component: RegStudentComponent;
  let fixture: ComponentFixture<RegStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegStudentComponent]
    });
    fixture = TestBed.createComponent(RegStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
