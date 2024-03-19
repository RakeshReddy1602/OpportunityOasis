import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { job } from 'src/app/Job.interface';
import { vendor } from 'src/app/Vendor.interface';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit{

  jobPostForm! : FormGroup;
  vendor!:vendor;
  jobList : job[] = [];
  jobId : number =-1;
  mobileRegex = /^[6-9]\d{9}$/;
  emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


  ngOnInit(): void {
    this.jobPostForm = new FormGroup({
      name : new FormControl('',[Validators.required,Validators.minLength(4)]),
      description : new FormControl('',[Validators.required,Validators.minLength(6)]),
      contact : new FormControl('',[Validators.required,Validators.pattern(this.mobileRegex)]),
      email : new FormControl('',[Validators.required,Validators.pattern(this.emailRegex)]),
      duration : new FormControl(0,[Validators.required]),
      skills : new FormControl('',[Validators.required])
    })

    let storedJobList = localStorage.getItem('jobList');
    if(storedJobList !== null){
      this.jobList = JSON.parse(storedJobList);
    }

    let storedJobId = localStorage.getItem('jobId');
    if(storedJobId !== null){
      this.jobId = JSON.parse(storedJobId);
    }
    let storedVendor = localStorage.getItem('vendor');
    if(storedVendor !== null){
      this.vendor = JSON.parse(storedVendor);
    }
  }

  postJob(){
    let name = this.jobPostForm.get('name')!.value;
    let description = this.jobPostForm.get('description')!.value;
    let contact = this.jobPostForm.get('contact')!.value;
    let email = this.jobPostForm.get('email')!.value;
    let duration = this.jobPostForm.get('duration')!.value;
    let skills = this.jobPostForm.get('skills')!.value;
    let time = new Date();
    let vendorId : number = this.vendor.vendorId;
    time.setHours(18);
    console.log("type res "+vendorId);
    console.log(vendorId);
    let newJob ={id:this.jobId,vendorId:vendorId,name:name,description:description,contact:contact,email:email,duration:duration,shopAddress:this.vendor.businessAddress,shopName:this.vendor.businessName,skills:skills,salary:6000,startTime:time};
    this.jobList.push(newJob);
    localStorage.setItem('jobList',JSON.stringify(this.jobList));
    this.jobId++
    localStorage.setItem('jobId',JSON.stringify(this.jobId));
    this.jobPostForm.reset();
  }

}
