import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/users.effect';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "src/app/shared/shared.module";
import {MatIconModule} from '@angular/material/icon';



const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add-user', pathMatch:'full',
    component: AddComponent,
  },
  {
    path: 'edit-user/:id/:page',
    component: AddComponent,
  },
  // {
  //   path: 'list-user',
  //   component: ListComponent,
  // },

];



@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule, SharedModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    StoreModule.forFeature('myusers', userReducer),
    EffectsModule.forFeature([UsersEffect]),
    RouterModule.forChild(routes)
  ],
})
export class UsersModule {}
