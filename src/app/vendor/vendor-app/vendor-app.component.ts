import { Component, OnInit } from '@angular/core';
import { application } from 'src/app/Application.interface';
import { vendor } from 'src/app/Vendor.interface';
@Component({
  selector: 'app-vendor-app',
  templateUrl: './vendor-app.component.html',
  styleUrls: ['./vendor-app.component.css']
})
export class VendorAppComponent implements OnInit{

  applicationList : application[] = [];
  myApplications : application[] = [];
  jobId:number = -1;
  vendor! : vendor;

  constructor(){}

  ngOnInit(): void {
    
    let storedAppList = localStorage.getItem('applicationList');
    if(storedAppList !== null){
      this.applicationList = JSON.parse(storedAppList);
    }
    let storedVendor = localStorage.getItem('vendor');
    if(storedVendor !== null){
      this.vendor = JSON.parse(storedVendor);
    }
   let storedSharedId = localStorage.getItem('sharedJobId');
   if(storedSharedId !== null){
    this.jobId = JSON.parse(storedSharedId);
   }
    this.getMyApplications(this.jobId);
  }

  getMyApplications(jobId:number){
    this.applicationList.forEach((app)=>{
      if(app.jobId == jobId && app.status == 'Pending'){
        console.log("matched");
        this.myApplications.push(app);
      }
    })
  }

  accept(application:application){
   application.status = 'Accepted';
   this.updateAppList(application);
   this.updateMyApplications();
  }

  reject(application:application){
    application.status = 'Rejected';
    this.updateAppList(application);
    this.updateMyApplications();
  }

  updateMyApplications(){
    this.myApplications = this.myApplications.filter((app)=>{
      return app.status == 'Pending';
     })
  }

  updateAppList(application:application){
    this.applicationList = this.applicationList.filter((app)=>{
      return app != application;
   });
   this.applicationList.push(application);
    localStorage.setItem('applicationList',JSON.stringify(this.applicationList));
  }

}
