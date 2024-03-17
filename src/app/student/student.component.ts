import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  constructor(private router:Router){}

  navToApplyJobs(){
    this.router.navigate(['/apply-jobs']);
  }

  navToApplications(){
    this.router.navigate(['/applications']);
  }

  navToWorkLog(){
    this.router.navigate(['/worklog']);
  }
}
