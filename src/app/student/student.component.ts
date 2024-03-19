import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { student } from '../Student.interface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  student!:student;
  constructor(private router:Router){}

  ngOnInit(): void {
      let storedStudent = localStorage.getItem('student');
      if(storedStudent != null){
        this.student = JSON.parse(storedStudent);
      }
  }

  navToApplyJobs(){
    this.router.navigate(['/apply-jobs']);
  }

  navToApplications(){
    this.router.navigate(['/student-app']);
  }

  navToProfile(){
    this.router.navigate(['/student-profile']);
  }

  navToResults(){
    this.router.navigate(['/results']);
  }
}
