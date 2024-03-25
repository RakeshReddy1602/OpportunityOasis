import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnsubscriptionError } from 'rxjs';
import { student } from 'src/app/Student.interface';
import { vendor } from 'src/app/Vendor.interface';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetForm! : FormGroup;
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  studentList : student[] =[];
  vendorList : vendor[] = [];
  userExists : boolean = true;

  constructor(private tservice:ToastService,private router:Router){}

  ngOnInit(): void {
      this.resetForm = new FormGroup({
        regNumber : new FormControl('',[Validators.required]),
        entryPassword : new FormControl('',[Validators.required,Validators.pattern(this.passwordRegex)]),
        confirmPassword : new FormControl('',[Validators.required]),
      });

      let storedStuList = localStorage.getItem('studentList');
      if(storedStuList != null){
        this.studentList = JSON.parse(storedStuList);;
      }
      let storedVendorList = localStorage.getItem('vendorList');
      if(storedVendorList != null){
        this.vendorList = JSON.parse(storedVendorList);;
      }
  }

  resetPassword(){
    let regNumber = this.resetForm.get('regNumber')!.value;
    let entryPassword = this.resetForm.get('entryPassword')!.value;
    let confirmPassword = this.resetForm.get('confirmPassword')!.value;

    if((''+regNumber).length == 6){
        this.updateVendors(regNumber,entryPassword,confirmPassword)
    }
    else if((''+regNumber).length == 8){
      this.updateStudents(regNumber,entryPassword,confirmPassword)
    }
    else{
      this.userExists = false;
    }
    
  }

  updateStudents(regNumber:number,entryPassword:string,confirmPassword:string){
    let currStudent = this.studentList.find((st)=>{
      return st.regNumber == regNumber;
    });
    if(currStudent == undefined){
      this.userExists = false;
      return ;
    }
    this.userExists = true;
   if(this.isSamePassword()){
    this.studentList = this.studentList.filter((st)=>{
      st.regNumber != regNumber;
    });
    if(currStudent != undefined){
      currStudent!.password = entryPassword;
      this.studentList.push(currStudent);
    }
    this.tservice.showSuccess('Success !!','Password Reset done.Redirecting to login page');
    localStorage.setItem('studentList',JSON.stringify(this.studentList));
    this.router.navigate(['/login']);
   }
  }

  updateVendors(vendorId:number,entryPassword:string,confirmPassword:string){
    let currVendor = this.vendorList.find((v)=>{
      return v.vendorId == vendorId;
    });
    if(currVendor == undefined){
      this.userExists = false;
      return ;
    }
    this.userExists = true;
    if(this.isSamePassword()){
     this.vendorList = this.vendorList.filter((v)=>{
       v.vendorId != vendorId;
     });
     if(currVendor != undefined){
       currVendor!.password = entryPassword;
       this.vendorList.push(currVendor);
     }
     this.tservice.showSuccess('Success !!','Password Reset done.Redirecting to login page');
     localStorage.setItem('vendorList',JSON.stringify(this.vendorList));
     this.router.navigate(['/login']);
    }
  }


    isSamePassword() : boolean{
      return this.resetForm.get('entryPassword')?.value === this.resetForm.get('confirmPassword')?.value;
    }
}
