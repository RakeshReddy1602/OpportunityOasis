import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule } from '@angular/material/button';
import {MatInputModule } from '@angular/material/input';
import {MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegStudentComponent } from './auth/reg-student/reg-student.component';
import { RegVendorComponent } from './auth/reg-vendor/reg-vendor.component';
import { LoginComponent } from './auth/login/login.component';
import { StudentComponent } from './student/student.component';
import { VendorComponent } from './vendor/vendor.component';
import { ApplyJobComponent } from './student/apply-job/apply-job.component';
import { PostJobComponent } from './vendor/post-job/post-job.component';
import { ProfileComponent } from './vendor/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from './header/header.component';
import { VendorAppComponent } from './vendor/vendor-app/vendor-app.component';
import { StudentAppComponent } from './student/student-app/student-app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactComponent } from './contact/contact.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsComponent } from './student/results/results.component';
import { SelectedStudentsComponent } from './vendor/selected-students/selected-students.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegStudentComponent,
    RegVendorComponent,
    LoginComponent,
    StudentComponent,
    VendorComponent,
    ApplyJobComponent,
    PostJobComponent,
    ProfileComponent,
    StudentProfileComponent,
    DialogComponent,
    HeaderComponent,
    VendorAppComponent,
    StudentAppComponent,
    FeedbackComponent,
    ContactComponent,
    ResultsComponent,
    SelectedStudentsComponent,
    AboutUsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
