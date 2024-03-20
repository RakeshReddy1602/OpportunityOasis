import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  contactForm! : FormGroup;
  emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor(private tservice:ToastService){}

  ngOnInit(): void {
      this.contactForm = new FormGroup({
        email:new FormControl('',[Validators.required,Validators.pattern(this.emailRegex)]),
        subject : new FormControl('',[Validators.required,Validators.minLength(4)]),
        message: new FormControl('',[Validators.required,Validators.minLength(10)])
      })
  }

  submit(){
    this.tservice.showSuccess('Message Received','Our team will resolve your issue soon');
    this.contactForm.reset()
  }

}
