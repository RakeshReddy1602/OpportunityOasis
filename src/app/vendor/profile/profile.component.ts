import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { vendor } from 'src/app/Vendor.interface';
import { DialogServiceService } from 'src/app/dialog-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  editable:boolean = false;
  mobileRegex = /^[6-9]\d{9}$/;
  emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  detailsForm! : FormGroup;
  vendor! :vendor;
  vendorList : vendor[] = [];
  constructor(private dservice:DialogServiceService){}

  ngOnInit(): void {

    let storedVendor = localStorage.getItem('vendor'); 
    if(storedVendor !== null){
      this.vendor = JSON.parse(storedVendor);
    }
      this.detailsForm = new FormGroup({
        vendorId : new FormControl(this.vendor.vendorId),
        name:new FormControl(this.vendor.name,[Validators.required,Validators.minLength(4)]),
        shopName:new FormControl(this.vendor.businessName,[Validators.required]),
        shopAddress:new FormControl(this.vendor.businessAddress,[Validators.required]),
        mobile:new FormControl(this.vendor.mobile,[Validators.required,Validators.pattern(this.mobileRegex)]),
        email:new FormControl(this.vendor.email,[Validators.required,Validators.pattern(this.emailRegex)])
      })

      let storedVendorList = localStorage.getItem('vendorList');
      if(storedVendorList !== null){
        this.vendorList = JSON.parse(storedVendorList);
      }
  }

  toggleEdit(){
    if(this.editable){
      this.saveDetails();
    }
    this.editable = !this.editable; 
  }

  saveDetails(){
    this.dservice.openDialogBox('Save Details','Do you want to save Details').afterClosed().subscribe((response)=>{
      if(response == 'true'){
        let vendorId = this.detailsForm.get('vendorId')!.value;
        let name = this.detailsForm.get('name')!.value;
        let shopName = this.detailsForm.get('shopName')!.value;
        let shopAddress = this.detailsForm.get('shopAddress')!.value;
        let mobile = this.detailsForm.get('mobile')!.value;
        let email = this.detailsForm.get('email')!.value;
        let currVendor = this.vendorList.find((v)=>v.vendorId==vendorId);
        let password = currVendor!.password;
        this.vendorList = this.vendorList.filter((v)=>{
          return v.vendorId != vendorId;
        })
        let updatedVendor = {vendorId:vendorId,businessName:shopName,businessAddress:shopAddress,email:email,mobile:mobile,name:name,password:password}
        this.vendorList.push(updatedVendor);
        localStorage.setItem('vendorList',JSON.stringify(this.vendorList));
        localStorage.setItem('vendor',JSON.stringify(updatedVendor));

      }
    })
  }
}
