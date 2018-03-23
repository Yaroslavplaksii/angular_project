import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDataServiceService} from "../user-data-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserDataServiceService]
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router,private UserDataServiceService: UserDataServiceService) {
    if(localStorage.getItem('jwtToken')!==null){
      this.router.navigate(['dashboard']);
    }
  }

  message = '';
  data: any;

  form: FormGroup;

    ngOnInit(){
      this.form = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      });
    }

  login() {
    this.UserDataServiceService.loginUser(this.form.value).subscribe(resp => {
    //this.http.post('http://localhost:1180/login',this.form.value).subscribe(resp => {
      this.data = resp;
      this.message = '';
      if(this.data.token){
        localStorage.setItem('jwtToken', this.data.token);
        this.router.navigate(['dashboard']);
      }else{
        this.router.navigate(['login']);
        this.message = 'Error login or password';
      }
    }, err => {
      this.message = err.error.msg;
    });
  }
}
