import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {UserDataServiceService} from "../user-data-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserDataServiceService]
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private UserDataServiceService: UserDataServiceService) {
    if(localStorage.getItem('jwtToken')===null){
      this.router.navigate(['/login']);
    }
  }


  ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  }
  form: FormGroup;
  message = '';
  data: any;

  register() {
    this.UserDataServiceService.registerUser(this.form.value).subscribe(resp => {
    //this.http.post('http://localhost:1180/register',this.form.value).subscribe(resp => {
      this.data = resp;
      this.message = '';
      if(this.data.error){
        this.message = this.data.message;
        this.router.navigate(['register']);
      }else{
        this.router.navigate(['login']);
      }
    }, err => {
      this.message = err.error.msg;
    });
  }
}
