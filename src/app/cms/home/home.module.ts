import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { HomeEffect } from "./store/home-effect";
import { StoreModule } from "@ngrx/store";
import { homeReducer } from "./store/home-reducer";
import { UsersEffect } from "../users/store/users.effect";
import { SharedModule } from "src/app/shared/shared.module";
import * as Aos from 'aos';

import { SwiperModule } from "swiper/angular";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  declarations: [HomeComponent],

  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SharedModule,
    SwiperModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffect]),
    RouterModule.forChild(routes)],
})
export class HomeModule { 
  constructor() {
    Aos.init();
  }
}