import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { student } from 'src/app/Student.interface';
import { vendor } from 'src/app/Vendor.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  showLoginForm : boolean = true;
  loginForm! : FormGroup;
  registerForm! : FormGroup;
  path:string= '';
  isValidUser : boolean = true;
  studentList : student[] = [];
  vendorList : vendor[] = [];
  constructor(private router:Router){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      regNumber : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8)]),
      password: new FormControl('',[Validators.required])
    })
    this.registerForm = new FormGroup({
      userType : new FormControl('',[Validators.required])
    })

    let storedVendList = localStorage.getItem('vendorList');
    if(storedVendList !== null){
      this.vendorList = JSON.parse(storedVendList);
    }

    let storedStuList = localStorage.getItem('studentList');
    if(storedStuList !== null){
      this.studentList = JSON.parse(storedStuList);
    }

  }

  toggleForm(){
    this.showLoginForm = !this.showLoginForm;
  }
  login(){
    let id = this.loginForm.get('regNumber')!.value;
    let password = this.loginForm.get('password')!.value;

    if(id.length == 6){
      let vendor = this.validateVendor(id,password);
      if(vendor == null){
        this.isValidUser = false;
      }
      else{
        this.isValidUser = true;
        localStorage.setItem('vendor',JSON.stringify(vendor));
        localStorage.setItem('isStudent','false');
        this.router.navigate(['vendor-dashboard']);
      }
    }
    else{
      let student = this.validateStudent(id,password);
      if(student == null){
        this.isValidUser = false;
      }
      else{
        localStorage.setItem('student',JSON.stringify(student));
        localStorage.setItem('isStudent','true');
        this.router.navigate(['student-dashboard']);
      }
    }
  }

  register(){
    let path= 'reg-';
    this.router.navigate([path+this.registerForm.get('userType')!.value]);
  }

  isInvalidId(){
    let id = this.loginForm.get('regNumber')!.value;
    return id.length != 6 && id.length != 8;
  }

  validateStudent(id:number,password:string):any{
    let currStudent = this.studentList.find((s)=>{
      return s.regNumber == id && s.password == password;
    });
    return currStudent;
  }

  validateVendor(id:number,password:string):any{
    let currVendor = this.vendorList.find((v)=>{
      return v.vendorId == id && v.password == password;
    });
    return currVendor;
  }

}
