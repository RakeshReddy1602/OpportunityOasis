import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr:ToastrService) { }

  showSuccess(title:string,message:string) {
    this.toastr.success(message,title,{enableHtml:true,easeTime:1000,timeOut:3000});
  }
  showWarning(title:string,message:string) {
    this.toastr.warning(message,title,{enableHtml:true,easeTime:1000,timeOut:3000});
  }
}
