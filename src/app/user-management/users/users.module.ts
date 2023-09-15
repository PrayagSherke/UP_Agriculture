import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/users.effect';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserViewComponent } from './user-view/user-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "src/app/shared/shared.module";
import { MatIconModule } from '@angular/material/icon';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'add-user', pathMatch: 'full',
    component: UserAddEditComponent,
  },
  {
    path: 'edit-user/:id/:page',
    component: UserAddEditComponent,
  },
  {
    path: 'view-user/:id/:page',
    component: UserViewComponent,
  },

];

@NgModule({
  declarations: [UserListComponent, UserAddEditComponent, UserViewComponent],
  imports: [
    CommonModule, SharedModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    StoreModule.forFeature('myusers', userReducer),
    EffectsModule.forFeature([UsersEffect]),
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

export class UsersModule { }
