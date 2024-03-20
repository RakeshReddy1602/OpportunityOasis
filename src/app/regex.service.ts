import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {

  mobileRegex = /^[6-9]\d{9}$/;
  emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  constructor() { }
}
