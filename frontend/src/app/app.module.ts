import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

//import { ReactiveFormsModule } from "@angular/forms";
//import { FormGroup} from "@angular/forms";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NgForm} from "@angular/forms";
import { UserDataServiceService } from './user-data-service.service';
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './dashboard/header/header.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { AddUserComponent } from './dashboard/add-user/add-user.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';

// const appRoutes: Routes = [
//
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     data: { title: 'Dashboard' }
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     data: { title: 'Login' }
//   },
//   {
//     path: 'register',
//     component: RegisterComponent,
//     data: { title: 'Register' }
//   },
//   {
//     path: 'logout',
//     component: LogoutComponent,
//     data: { title: 'Sign Up' }
//   },
//   { path: '',
//     redirectTo: '/',
//     pathMatch: 'full'
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    RegisterComponent,
    HeaderComponent,
    UserListComponent,
    AddUserComponent,
    PersonalDataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    //FormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // )
  ],
  providers: [UserDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
