import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vendor } from '../Vendor.interface';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit{

  vendor! : vendor;

  constructor(private router:Router){}

  ngOnInit(): void {
    let storedVendor = localStorage.getItem('vendor');
    if(storedVendor !== null){
      this.vendor = JSON.parse(storedVendor);
    }
  }

  navToProfile(){
    this.router.navigate(['/vendor-profile']);
  }

  navToApplications(){
    this.router.navigate(['/open-jobs']);
  }

  navToJobPost(){
    this.router.navigate(['/post-job']);
  }

  navToSelStudents(){
    this.router.navigate(['/selected-students']);
  }
}
