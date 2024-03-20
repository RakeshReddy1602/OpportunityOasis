import { Component, OnInit } from '@angular/core';
import { application } from 'src/app/Application.interface';
import { vendor } from 'src/app/Vendor.interface';

@Component({
  selector: 'app-selected-students',
  templateUrl: './selected-students.component.html',
  styleUrls: ['./selected-students.component.css']
})
export class SelectedStudentsComponent implements OnInit{
  myApplications : application[] =[];
  applicationList: application[] = [];
  vendor!:vendor;


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
      // console.log(app.vendorId +" "+this.vendor.vendorId)
      if(app.vendorId == this.vendor.vendorId && app.status == 'Accepted'){
        this.myApplications.push(app);
      }
    })
  }
}
