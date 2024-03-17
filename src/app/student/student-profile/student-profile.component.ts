import { Component } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  editable : boolean = false;

  toggleEdit(){
    this.editable = !this.editable;
  }  
} 
