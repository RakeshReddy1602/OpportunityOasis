import { Component, OnInit } from '@angular/core';
import { job } from 'src/app/Job.interface';
import { application } from 'src/app/Application.interface';
import { DialogServiceService } from 'src/app/dialog-service.service';
import { ToastService } from 'src/app/toast.service';
import { student } from 'src/app/Student.interface';


@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit{
  
  jobList :job[] = [];
  applicationList : application[] = [];
  student!:student;
  appliedJobs : Set<number> = new Set();
  constructor(private dservice:DialogServiceService,private tservice :ToastService){}

  ngOnInit(): void {
    let storedJobList = localStorage.getItem('jobList');
    if(storedJobList !== null){
      this.jobList = JSON.parse(storedJobList);
    }

    let storedStudent = localStorage.getItem('student');
    if(storedStudent != null){
      this.student = JSON.parse(storedStudent);
    }
    
    let storedAppData = localStorage.getItem('applicationList');
    if(storedAppData !== null){
      this.applicationList = JSON.parse(storedAppData);
      // get job list that applied for
      this.applicationList.forEach((app)=>{
        if(app.regNumber == this.student.regNumber){
          this.appliedJobs.add(app.jobId);
        }
      })
    } 
    
  }

  updateApplications(job:job):void{
    this.dservice.openDialogBox('Confirmation','Are you sure to apply this job ?').afterClosed().subscribe(response =>{
      if(response == 'true'){
        this.upadteApplyStatus(job)
        this.tservice.showSuccess('Success','Applied Successfully');
      }
    })
  
  }

  upadteApplyStatus(job:job):void{
    let newApplication :application = {jobId: job.id,jobTitlle:job.name,regNumber:this.student.regNumber,status:'Pending',time:new Date(),vendorId:job.vendorId,vendorName:job.shopName};
    this.appliedJobs.add(job.id);
    this.applicationList.push(newApplication);
    localStorage.setItem('applicationList',JSON.stringify(this.applicationList));
  }
  
  alraedyApplied(id:number):boolean{
   return this.appliedJobs.has(id);

  }

}
