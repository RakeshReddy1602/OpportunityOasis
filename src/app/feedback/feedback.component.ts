import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexService } from '../regex.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{

  feedbackForm! : FormGroup;


  constructor(private rservice:RegexService,private tservice:ToastService){}

  ngOnInit(): void {
      this.feedbackForm = new FormGroup({
        email : new FormControl('',[Validators.required,Validators.pattern(this.rservice.emailRegex)]),
        subject : new FormControl('',[Validators.required,Validators.minLength(4)]),
        message : new FormControl('',[Validators.required,Validators.minLength(10)]),
      })
  }

  submit(){
    this.tservice.showSuccess('Feedback Received','This helps us to improve our perfomance');
    this.feedbackForm.reset()
  }
}
