import { Component, OnInit } from '@angular/core';
import {UserDataServiceService} from "../../user-data-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

users: any;
  constructor(private UserDataService: UserDataServiceService, private router: Router) {
  if(localStorage.getItem('jwtToken')===null){
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }
}

  ngOnInit() {
    this.UserDataService.getAllUsers(localStorage.getItem('jwtToken')).subscribe((users)=>{
     this.users = users;
    },(error)=>{
      if(error.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

}
