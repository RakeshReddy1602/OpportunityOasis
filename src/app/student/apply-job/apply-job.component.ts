import { Component, OnInit } from '@angular/core';
import { job } from 'src/app/Job.interface';
import { application } from 'src/app/Application.interface';
import { DialogServiceService } from 'src/app/dialog-service.service';
@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit{
  
  jobList :job[] = [];
  applicationList : application[] = [];
  appliedJobs = new Set(); 
  
  constructor(private dservice:DialogServiceService){}

  ngOnInit(): void {
    let storedJobList = localStorage.getItem('jobList');
    if(storedJobList !== null){
      this.jobList = JSON.parse(storedJobList);
    }

    let storedAppData = localStorage.getItem('applicationList');
    if(storedAppData !== null){
      this.applicationList = JSON.parse(storedAppData);
    } 
    let storedApplyJobs = localStorage.getItem('appliedJobs');
    // console.log("apply res ");
    // console.log(storedApplyJobs == null);
    if(storedApplyJobs != null){
      this.appliedJobs = new Set(JSON.parse(storedApplyJobs));
    }
  }

  updateApplications(job:job):void{
    this.dservice.openDialogBox('Confirmation','Are you sure to apply this job ?').afterClosed().subscribe(response =>{
      if(response == 'true'){
        this.upadteApplyStatus(job.id)
         this.applicationList.push({jobId:job.id,jobTitlle:job.name,time:new Date(),result:'Pending',vendorName:'id : '+job.vendorId});
        localStorage.setItem('applicationList',JSON.stringify(this.applicationList));
      }
    })
  
  }

  upadteApplyStatus(id:number):void{
    this.appliedJobs.add(id);
    let jobArray = Array.from(this.appliedJobs);
    localStorage.setItem('appliedJobs',JSON.stringify(jobArray));
  }
  
  alraedyApplied(id:number):boolean{
    return this.appliedJobs.has(id);
  }
}
