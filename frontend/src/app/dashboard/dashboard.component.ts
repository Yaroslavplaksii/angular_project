import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

// import { Observable } from 'rxjs/Observable';
// import { tap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
import * as jwt from 'jsonwebtoken';
import {FormControl, FormGroup, Validators } from "@angular/forms";
import { UserDataServiceService } from '../user-data-service.service';
import { User } from "../models/users";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[UserDataServiceService]
})

export class DashboardComponent implements OnInit {

  @ViewChild('myform') myform: NgForm;

  //user: User[] = [];
  user: object = {};
  message: any = '';
  countChar = 4;
  //form: FormGroup;

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
   // this.http.post('http://localhost:1180/dashboard', httpOptions).subscribe((data: User) => {
       this.user = data;

       this.email= this.user['email'];
       this.password ='';
       this.firstname = this.user['firstname'];
       this.lastname = this.user['lastname'];
       this.id = this.user['id'];

      // this.form = new FormGroup({
      //   email: new FormControl(this.user['email']),
      //   password: new FormControl(''),
      //   firstname: new FormControl(this.user['firstname']),
      //   lastname: new FormControl(this.user['lastname']),
      //   id: new FormControl(this.user['id'])
      // });

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
    //this.http.post('http://localhost:8080/update', this.form.value).subscribe((data) => {
        this.message = data['message'];
      },err=>{
        this.message = err;
    });
    //console.log('update',this.form.value);
  }
excel() {
  this.UserDataServiceService.exportExcel(localStorage.getItem('jwtToken')).subscribe(()=>{}
  // ,
  //   (error)=>{
  //     alert(12412412);
  //   }
  );
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
