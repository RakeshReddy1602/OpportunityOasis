import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog:MatDialog) { }

  openDialogBox(title:string,message:string){
    return this.dialog.open(DialogComponent,{
      height:'fit-content',
      data:{title:title,message:message}
    })
  }
}
