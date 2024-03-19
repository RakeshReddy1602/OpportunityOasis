import { Component, TestabilityRegistry } from '@angular/core';
import { application } from 'src/app/Application.interface';
import { student } from 'src/app/Student.interface';
import { DialogServiceService } from 'src/app/dialog-service.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-student-app',
  templateUrl: './student-app.component.html',
  styleUrls: ['./student-app.component.css']
})
export class StudentAppComponent {
  applicationList : application[] = [];
  student! :student;

  constructor(private dservice:DialogServiceService,private tservice:ToastService){}

  ngOnInit(): void {
    let storedAppData = localStorage.getItem('applicationList');
    if(storedAppData !== null){
      this.applicationList = JSON.parse(storedAppData);
    }

    let storedStudent = localStorage.getItem('student');
    if(storedStudent !== null){
      this.student = JSON.parse(storedStudent);
    }



  }

  withdraw(jobId:number){
    this.dservice.openDialogBox('Confirmation','Are you sure to withdraw your application').afterClosed().subscribe((response)=>{
      if(response === 'true'){
        this.applicationList = this.applicationList.filter((app)=>{
          return (app.jobId != jobId || app.regNumber != this.student.regNumber);
         });
         localStorage.setItem('applicationList',JSON.stringify(this.applicationList));
         this.tservice.showWarning('Applicaiton withdrawn','Success')
      }
    })
  }

  canWithDraw(status:string):boolean{
    return status != 'Pending';
  }
}
