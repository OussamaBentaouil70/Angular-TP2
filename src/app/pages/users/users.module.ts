import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { usersRoutes } from './users-routing';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [
    AddUserComponent,
    ListUsersComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    FormsModule,
    TranslateModule,
    NgbDropdownModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
