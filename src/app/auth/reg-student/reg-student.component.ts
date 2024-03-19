import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { student } from 'src/app/Student.interface';

@Component({
  selector: 'app-reg-student',
  templateUrl: './reg-student.component.html',
  styleUrls: ['./reg-student.component.css']
})
export class RegStudentComponent implements OnInit{

  registerForm! : FormGroup;

  studentList : student[] = [];
  studentExist : boolean = false;
  mobileRegex = /^[6-9]\d{9}$/;
  emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  appliedJobs :Map<number,Set<number>> =  new Map();
  constructor(private router:Router){}

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        regNumber : new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
        name : new FormControl('',[Validators.required]),
        mobile : new FormControl('',[Validators.required,Validators.pattern(this.mobileRegex)]),
        email : new FormControl('',[Validators.required,Validators.email,Validators.pattern(this.emailRegex)]),
        residence : new FormControl('',[Validators.required]),
        entryPassword : new FormControl('',[Validators.required,Validators.pattern(this.passwordRegex),Validators.minLength(8),Validators.maxLength(20)]),
        confirmPassword : new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
        skills : new FormControl('',[Validators.required]),
      })

      let storedStuList = localStorage.getItem('studentList');
      if(storedStuList !== null){
        this.studentList= JSON.parse(storedStuList);
      }

  }

  register(){
    if(this.addStudent()){
      localStorage.setItem('isStudent','true')
      this.router.navigate(['/student-dashboard']);
    }
  }

  addStudent():boolean{
    let regNumber = this.registerForm.get('regNumber')!.value;
    let name = this.registerForm.get('name')!.value;
    let mobile = this.registerForm.get('mobile')!.value;
    let email = this.registerForm.get('email')!.value;
    let residence = this.registerForm.get('residence')!.value;
    let password = this.registerForm.get('entryPassword')!.value;
    let skills = this.registerForm.get('skills')!.value;
    if(this.checkExistence(regNumber)){
      this.studentExist = true;
      return false;
    }
    let student = {regNumber:regNumber,name:name,mobile:mobile,email:email,residence:residence,password:password,skills:skills};
    this.studentList.push(student);
    localStorage.setItem('studentList',JSON.stringify(this.studentList));
    localStorage.setItem('student',JSON.stringify(student));
    return true;
  }

  checkExistence(regNumber : number):boolean{
    let result = this.studentList.find((st)=>{
      return st.regNumber == regNumber;
    })
    return result != undefined;
  }

  passwordNotMatch(){
    let entryPassword = this.registerForm.get('entryPassword')!.value;
    let confirmPassword = this.registerForm.get('confirmPassword')!.value;
    return entryPassword !== confirmPassword;
  }
}
