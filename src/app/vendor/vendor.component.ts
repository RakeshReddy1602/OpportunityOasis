import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {

  constructor(private router:Router){}

  navToProfile(){
    this.router.navigate(['/vendor-profile']);
  }

  navToApplications(){
    this.router.navigate(['/vendor-app']);
  }

  navToJobPost(){
    this.router.navigate(['/post-job']);
  }

  navToSelStudents(){
    this.router.navigate(['/selected-students']);
  }
}
