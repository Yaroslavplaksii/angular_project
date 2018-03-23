import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

import * as jwt from 'jsonwebtoken';
import {FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import {UserDataServiceService} from "../../user-data-service.service";


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
  providers:[UserDataServiceService]
})

export class PersonalDataComponent implements OnInit {

  @ViewChild('myform') myform: NgForm;

  user: object = {};
  message: any = '';
  countChar = 4;


  constructor(private http: HttpClient, private router: Router, private UserDataServiceService: UserDataServiceService) {

    if(localStorage.getItem('jwtToken')===null){
      localStorage.removeItem('jwtToken');
      this.router.navigate(['login']);
    }
  }
  email: '';
  password: '';
  firstname: '';
  lastname: '';
  id: '';


  ngOnInit() {

    let user_param = jwt.decode(localStorage.getItem('jwtToken'));

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') }),
      user_id: user_param.id
    };
    this.UserDataServiceService.getUserData(httpOptions).subscribe((data) => {
      this.user = data;

      this.email= this.user['email'];
      this.password ='';
      this.firstname = this.user['firstname'];
      this.lastname = this.user['lastname'];
      this.id = this.user['id'];



    }, err => {
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
  update(){
    this.myform.value['id'] = this.id;
    // this.form = new FormGroup({
    //   email: new FormControl(this.user['email'],[Validators.email,Validators.required]),
    //   password: new FormControl(''),
    //   firstname: new FormControl(this.user['firstname'],[Validators.required]),
    //   lastname: new FormControl(this.user['lastname'],[Validators.required,this.checkForLength]),
    //   id: new FormControl(this.user['id'],[Validators.required])
    // });
    this.UserDataServiceService.updateUserData(this.myform.value).subscribe((data) => {
      this.password ='';
      this.message = data['message'];
    },err=>{
      this.message = err;
    });

  }
  excel() {
    this.UserDataServiceService.exportExcel(localStorage.getItem('jwtToken')).subscribe(()=>{});
  }
  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

  checkForLength(control: FormControl){
    if(control.value.length <= 4){
      return {
        'errorLength' : true
      }
    }else{
      return null;
    }
  }
}







