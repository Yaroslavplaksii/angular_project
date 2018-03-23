import {Component, OnInit } from '@angular/core';
import {UserDataServiceService} from "../user-data-service.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[UserDataServiceService]
})

export class DashboardComponent implements OnInit {



  constructor(private http: HttpClient, private router: Router, private UserDataServiceService: UserDataServiceService) {

    if(localStorage.getItem('jwtToken')===null){
      localStorage.removeItem('jwtToken');
      this.router.navigate(['login']);
    }
  }



  ngOnInit() {
  }

excel() {
  this.UserDataServiceService.exportExcel(localStorage.getItem('jwtToken')).subscribe(()=>{});
}
  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }


}
