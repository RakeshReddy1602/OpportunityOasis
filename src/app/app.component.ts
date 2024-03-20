import { Component, OnInit } from '@angular/core';
import { student } from './Student.interface';
import { vendor } from './Vendor.interface';
import { job } from './Job.interface';
import { application } from './Application.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'OpportunityOasis';
  vendorList : vendor[] = [];

  jobList : job[] = [];
  applicationList : application[] = [];
  appliedJobs :Map<number,Set<number>> = new Map();

  ngOnInit(): void {
    this.vendorList.push({vendorId:123456,name:'Sreekanth Reddy',businessName:'Food Heaven',businessAddress:'near Apartments',email:'sree@gmail.com',mobile:'6305393112',password:'R@ki6305'});
    this.vendorList.push({vendorId:122523,name:'Vamsi Dandu',businessName:'Hangouts',businessAddress:'Canteen BH3',email:'vamsi@gmail.com',mobile:'7288076363',password:'R@ki6305'});
    let time = new Date();
    time.setHours(18);
    this.jobList.push({id:101,name:'Delivery Boy',description:'delivers foood items',duration:4,vendorId:123456,contact:'6305393112',email:'sree@gmail.com',shopName:'Hangouts',shopAddress:'near BH1',skills:'NA',salary:5000,startTime:time});
    this.jobList.push({id:102,name:'Waiter',description:'Coolie na kodaka',duration:4,vendorId:123456,contact:'6305393112',email:'sree@gmail.com',shopName:'Hangouts',shopAddress:'near BH1',skills:'NA',salary:5000,startTime:time});
    this.jobList.push({id:201,name:'Assistant Chef',description:'Helps chef ',duration:4,vendorId:122523,contact:'7288076363',email:'vamsi@gmail.com',shopName:'Foodie Lover',shopAddress:'near apartments',skills:'NA',salary:5000,startTime:time});
    this.jobList.push({id:202,name:'Cashier',description:'Coolie na kodaka',duration:4,vendorId:122523,contact:'7288076363',email:'vamsi@gmail.com',shopName:'Foodie Lover',shopAddress:'near apartments',skills:'NA',salary:5000,startTime:time});
    if(localStorage.getItem('vendorList') == null){
      localStorage.setItem('vendorList',JSON.stringify(this.vendorList));
    }
   
    if(localStorage.getItem('jobList') == null){
      localStorage.setItem('jobList',JSON.stringify(this.jobList));
    }
    if(localStorage.getItem('applicationList') == null){
      localStorage.setItem('applicationList',JSON.stringify(this.applicationList));
    }
    let storedVendor = localStorage.getItem('vendorId');
    if(storedVendor == null){
      localStorage.setItem('vendorId','3');
    }
    let storedJobId = localStorage.getItem('jobId');
    if(storedJobId == null){
      localStorage.setItem('jobId','003');
    }
    let storedStudent = localStorage.getItem('vendorId');
    if(storedStudent == null){
      localStorage.setItem('isStudent','false');
    }
   
  }
}
