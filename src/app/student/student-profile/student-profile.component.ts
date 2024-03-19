import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { student } from 'src/app/Student.interface';
import { DialogServiceService } from 'src/app/dialog-service.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit{
  editable : boolean = false;
  detailsForm! : FormGroup;
  student! : student;
  studentList:student[] =[];
  mobileRegex = /^[6-9]\d{9}$/;
  emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor(private dservice : DialogServiceService){}

  ngOnInit(): void {
    
  let storedStudent = localStorage.getItem('student'); 
  if(storedStudent !== null){
    this.student = JSON.parse(storedStudent);
  }

    this.detailsForm = new FormGroup({
      regNumber : new FormControl(this.student.regNumber),
      name:new FormControl(this.student.name,[Validators.required,Validators.minLength(4)]),
      mobile:new FormControl(this.student.mobile,[Validators.required,Validators.pattern(this.mobileRegex)]),
      email:new FormControl(this.student.email,[Validators.required,Validators.pattern(this.emailRegex)]),
      residence:new FormControl(this.student.residence,[Validators.required]),
      skills:new FormControl(this.student.skills,[Validators.required]),
    });

    let storedStudentList = localStorage.getItem('studentList');
    if(storedStudentList !== null){
      this.studentList = JSON.parse(storedStudentList);
    }
  }

  toggleEdit(){
    if(this.editable){
      this.saveDetails();
    }
    this.editable = !this.editable;
  }  

  saveDetails(){
    this.dservice.openDialogBox('Save Details','Do you want to save your details').afterClosed().subscribe((response)=>{
      if(response == 'true'){
        let regNumber = this.detailsForm.get('regNumber')!.value;
        let name = this.detailsForm.get('name')!.value;
        let mobile = this.detailsForm.get('mobile')!.value;
        let residence = this.detailsForm.get('residence')!.value;
        let email = this.detailsForm.get('email')!.value;
        let skills = this.detailsForm.get('skills')!.value;
        let currStudent = this.studentList.find((s)=> s.regNumber == regNumber);
        let password = currStudent!.password;
        this.studentList = this.studentList.filter((s)=>{
          return s.regNumber !== regNumber;
        });
        this.student = {regNumber:regNumber,name:name,mobile:mobile,email:email,residence:residence,password:password,skills:skills};
        this.studentList.push(this.student);
        localStorage.setItem('studentList',JSON.stringify(this.studentList));
        localStorage.setItem('student',JSON.stringify(this.student));
      }
      else{
        this.editable = false;
      }
    })
  }
} 
