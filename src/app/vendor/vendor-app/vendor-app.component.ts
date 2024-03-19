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
  vendor! : vendor;

  ngOnInit(): void {
    
    let storedAppList = localStorage.getItem('applicationList');
    if(storedAppList !== null){
      this.applicationList = JSON.parse(storedAppList);
    }
    let storedVendor = localStorage.getItem('vendor');
    if(storedVendor !== null){
      this.vendor = JSON.parse(storedVendor);
    }
    this.getMyApplications();
  }

  getMyApplications(){
    this.applicationList.forEach((app)=>{
      console.log(app.vendorId +" "+this.vendor.vendorId)
      if(app.vendorId == this.vendor.vendorId && app.status == 'Pending'){
        this.myApplications.push(app);
      }
    })
  }

  accept(appplication:application){
   appplication.status = 'Accepted';
   this.updateAppList();
  }

  reject(application:application){
    application.status = 'Rejected';
    this.updateAppList();
  }

  updateAppList(){
    localStorage.setItem('applicationList',JSON.stringify(this.applicationList));
  }

}
