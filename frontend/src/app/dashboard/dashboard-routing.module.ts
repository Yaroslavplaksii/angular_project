import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {DashboardComponent} from "./dashboard.component";
import {UserDataServiceService} from "../user-data-service.service";

const cabinetRouter: Routes =[
  {path:'dashboard', component:DashboardComponent, children:[
      {path:'profile', component: PersonalDataComponent},
      {path:'listusers', component: UserListComponent},
      {path:'adduser', component: AddUserComponent}
  ]}
];

@NgModule({
  imports:[
    RouterModule.forChild(cabinetRouter)
  ],

  exports:[
    RouterModule
  ]
})
export class DashboardRouting {

}
