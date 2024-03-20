import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenJobsComponent } from './open-jobs.component';

describe('OpenJobsComponent', () => {
  let component: OpenJobsComponent;
  let fixture: ComponentFixture<OpenJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenJobsComponent]
    });
    fixture = TestBed.createComponent(OpenJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
