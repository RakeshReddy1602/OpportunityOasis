import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { vendor } from 'src/app/Vendor.interface';
import { RegexService } from 'src/app/regex.service';

@Component({
  selector: 'app-reg-vendor',
  templateUrl: './reg-vendor.component.html',
  styleUrls: ['./reg-vendor.component.css']
})
export class RegVendorComponent implements OnInit{
  registerForm! : FormGroup;
  alreadyExist:boolean = false;

  vendorList : vendor[]= [];
  constructor(private router:Router,private rserviec:RegexService){     }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      vendorId : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
      vendorName : new FormControl('',[Validators.required]),
      shopName : new FormControl('',[Validators.required]),
      shopAddress : new FormControl('',[Validators.required]),
      mobile : new FormControl('',[Validators.required,Validators.pattern(this.rserviec.mobileRegex)]),
      email : new FormControl('',[Validators.required,Validators.pattern(this.rserviec.emailRegex)]),
      entryPassword : new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern(this.rserviec.passwordRegex)]),
      confirmPassword : new FormControl('',[Validators.required,Validators.maxLength(20)]),
    });

    let storedVendorList = localStorage.getItem('vendorList');
    if(storedVendorList !== null){
      this.vendorList = JSON.parse(storedVendorList);
    }

    localStorage.setItem('isStudent','false');
}

submit(){
    this.updateVendorList();
}

updateVendorList(){
  let vendorId = this.registerForm.get('vendorId')!.value;
  let vendorName = this.registerForm.get('vendorName')!.value;
  let shopName = this.registerForm.get('shopName')!.value;
  let shopAddress = this.registerForm.get('shopAddress')!.value;
  let mobile = this.registerForm.get('mobile')!.value;
  let email = this.registerForm.get('email')!.value;
  let password = this.registerForm.get('entryPassword')!.value;
  if(this.checkExistence(vendorId)){
    this.alreadyExist = true;
  }
  else{
    let vendor = {vendorId:vendorId,name:vendorName,businessName:shopName,businessAddress:shopAddress,mobile:mobile,email:email,password:password};
    this.vendorList.push(vendor);
    localStorage.setItem('vendorList',JSON.stringify(this.vendorList));
    localStorage.setItem('vendor',JSON.stringify(vendor));
    this.router.navigate(['/vendor-dashboard']);
  }
}

checkExistence(vendorId:number):boolean{
  let result = this.vendorList.find((vendor)=>{
    console.log("values "+(vendorId )+" "+(vendor.vendorId));
    return vendor.vendorId == vendorId;
  });
  return result != undefined;
}

passwordNotMatch(){
  let entryPassword = this.registerForm.get('entryPassword')!.value;
  let confirmPassword = this.registerForm.get('confirmPassword')!.value;
  return entryPassword !== confirmPassword;
}
}
