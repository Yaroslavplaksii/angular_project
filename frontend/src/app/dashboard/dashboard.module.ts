import {NgModule} from "@angular/core";
import {AddUserComponent} from "./add-user/add-user.component";
import {HeaderComponent} from "./header/header.component";
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {UserListComponent} from "./user-list/user-list.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {DashboardRouting} from "./dashboard-routing.module";
import {CommonModule} from "@angular/common";

import {UserDataServiceService} from "../user-data-service.service";

@NgModule({
  declarations:[
    HeaderComponent,
    AddUserComponent,
    PersonalDataComponent,
    UserListComponent
  ],
  providers:[UserDataServiceService],
  imports:[
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DashboardRouting
  ],
  exports:[
    HeaderComponent
  ]
})
export class DashboardModule{

}
