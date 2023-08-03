import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffect } from "./store/login-effect";
import { StoreModule } from "@ngrx/store";
import { loginReducer } from "./store/login-reducer";
import { UsersEffect } from "../users/store/users.effect";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
]

@NgModule({
  declarations: [LoginComponent],

  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forFeature([LoginEffect]),
    RouterModule.forChild(routes)]
})
export class LoginModule { }