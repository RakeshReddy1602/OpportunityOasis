import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { application } from 'src/app/Application.interface';
import { job } from 'src/app/Job.interface';
import { vendor } from 'src/app/Vendor.interface';
import { DialogServiceService } from 'src/app/dialog-service.service';

@Component({
  selector: 'app-open-jobs',
  templateUrl: './open-jobs.component.html',
  styleUrls: ['./open-jobs.component.css']
})
export class OpenJobsComponent implements OnInit{

  jobList : job[] = [];
  myJobs : job[] =[];
  applicationList : application[] =[];
  vendor! : vendor;

  constructor(private dservice:DialogServiceService,private router:Router){}
  ngOnInit(): void {

    let storedAppList = localStorage.getItem('applicationList');
    if(storedAppList !== null){
      this.applicationList = JSON.parse(storedAppList);
    }
    let storedVendor = localStorage.getItem('vendor');
    if(storedVendor !== null){
      this.vendor = JSON.parse(storedVendor);
    }
      let stotedJobList = localStorage.getItem('jobList');
      if(stotedJobList !== null){
        this.jobList = JSON.parse(stotedJobList);
        
       this.getMyJobs();
      }
  }

  showApplications(jobId:number){
    localStorage.setItem('sharedJobId',JSON.stringify(jobId));
    this.router.navigate(['/vendor-app']);
  }

  deleteJob(jobId:number){
    this.dservice.openDialogBox('Delete Job ? ','Deleting this job will delete all recieved applications and this action is irreversible').afterClosed().subscribe((response)=>{
      if(response == 'true'){
        this.applicationList = this.applicationList.filter((app)=>{
          return app.jobId != jobId;
        });
        localStorage.setItem('applicationList',JSON.stringify(this.applicationList));
        this.jobList = this.jobList.filter((job)=>{
          return job.id != jobId;
        });
        this.getMyJobs();
        localStorage.setItem('jobList',JSON.stringify(this.jobList));
      }
    })
  }

  getMyJobs(){
    this.myJobs = [];
    this.jobList.forEach((job)=>{
      if(job.vendorId == this.vendor.vendorId){
        this.myJobs.push(job);
      }
    });
  }

}
