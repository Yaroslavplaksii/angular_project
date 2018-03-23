import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { tap,catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{

  constructor(private http: HttpClient, private router: Router) { }

  signupData = { email:'', password:'' };
  message = '';


  signup() {
    this.http.post('/logout',this.signupData).subscribe(resp => {
     // console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
