import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isMenuExpanded : boolean = false;
  isProfileExpanded : boolean = false;
  isStudent:boolean = false;
  profilePath : string = '';
  dashboardPath : string = '';
  ngOnInit(): void {
      let storedIsStudent = localStorage.getItem('isStudent');
      if(storedIsStudent != null){
        this.isStudent = JSON.parse(storedIsStudent);
      }
      console.log("user type");
      console.log(this.isStudent);
      if(this.isStudent){
        this.profilePath = '/student-profile';
        this.dashboardPath = '/student-dashboard';
      }
      else{
        this.profilePath = '/vendor-profile';
        this.dashboardPath = '/vendor-dashboard';
      }
  }

  toggleMenu(){
    this.isMenuExpanded = !this.isMenuExpanded
  }
  toggleProfile(){
    this.isProfileExpanded = !this.isProfileExpanded;
  }
}
