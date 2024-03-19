import { Component, OnInit } from '@angular/core';
import { application } from 'src/app/Application.interface';
import { student } from 'src/app/Student.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit{
  myApplications : application[] =[];
  applicationList: application[] = [];
  student!:student;
  ngOnInit(): void {
    
    let storedAppList = localStorage.getItem('applicationList');
    if(storedAppList !== null){
      this.applicationList = JSON.parse(storedAppList);
    }
    let storedStudent = localStorage.getItem('student');
    if(storedStudent !== null){
      this.student = JSON.parse(storedStudent);
    }
    this.getMyApplications();
  }

  getMyApplications(){
    this.applicationList.forEach((app)=>{
      if(app.regNumber == this.student.regNumber && app.status == 'Accepted'){
        this.myApplications.push(app);
      }
    })
  }
}
