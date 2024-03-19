import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegStudentComponent } from './auth/reg-student/reg-student.component';
import { RegVendorComponent } from './auth/reg-vendor/reg-vendor.component';
import { StudentComponent } from './student/student.component';
import { VendorComponent } from './vendor/vendor.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { ProfileComponent } from './vendor/profile/profile.component';
import { ApplyJobComponent } from './student/apply-job/apply-job.component';
import { PostJobComponent } from './vendor/post-job/post-job.component';
import { StudentAppComponent } from './student/student-app/student-app.component';
import { VendorAppComponent } from './vendor/vendor-app/vendor-app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactComponent } from './contact/contact.component';
import { ResultsComponent } from './student/results/results.component';
import { SelectedStudentsComponent } from './vendor/selected-students/selected-students.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'reg-student',component:RegStudentComponent},
  {path:'reg-vendor',component:RegVendorComponent},
  {path:'student-dashboard',component:StudentComponent},
  {path:'vendor-dashboard',component:VendorComponent},
  {path:'student-profile',component:StudentProfileComponent},
  {path:'vendor-profile',component:ProfileComponent},
  {path:'apply-jobs',component:ApplyJobComponent},
  {path:'student-app',component:StudentAppComponent},
  {path:'post-job',component:PostJobComponent},
  {path:'vendor-app',component:VendorAppComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'contact-us',component:ContactComponent},
  {path:'results',component:ResultsComponent},
  {path:'selected-students',component:SelectedStudentsComponent},
  {path:'about-us',component:AboutUsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
