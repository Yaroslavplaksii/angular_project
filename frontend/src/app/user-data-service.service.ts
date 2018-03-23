import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable} from "rxjs/Observable";

@Injectable()
export class UserDataServiceService {

  port: number = 1180;

  constructor(private http: HttpClient) { }

  getUserData(httpOptions){
    return  this.http.post(`http://localhost:${this.port}/dashboard`, httpOptions);
  }

  updateUserData(userData){
    return this.http.put(`http://localhost:${this.port}/update/${userData.id}`, userData);
  }

  loginUser(userdata){
    return  this.http.post(`http://localhost:${this.port}/login`,userdata);
  }

  registerUser(userdata){
    return this.http.post(`http://localhost:${this.port}/register`,userdata);
  }

  exportExcel(data){
      const headers = new HttpHeaders({
        "Content-Type" : "application/vnd.ms-excel; charset: UTF-8"
      });
    return this.http.get(`http://localhost:${this.port}/exportdata/${data}`,  {headers});
      // .catch((error: HttpResponse)=>{
      //   return Observable.throw('Server error');
      // });
  }

  getAllUsers(data){
    return this.http.get(`http://localhost:${this.port}/getallusers/${data}`);
  }
}
