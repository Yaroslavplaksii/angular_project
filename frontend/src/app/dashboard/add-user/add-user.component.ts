import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserDataServiceService} from "../../user-data-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserDataServiceService]
})
export class AddUserComponent implements OnInit {

  constructor(private UserDataService: UserDataServiceService, private router:Router,private http: HttpClient) { }

  form: FormGroup;

  ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  }
  message = '';
  data: any;
  register() {
    this.UserDataService.registerUser(this.form.value).subscribe(resp => {

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
