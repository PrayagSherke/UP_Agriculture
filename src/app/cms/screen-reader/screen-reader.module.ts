import { RouterModule, Routes } from "@angular/router";
import { ScreenReaderComponent } from "./screen-reader.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: ScreenReaderComponent,
  },
]

@NgModule({
  declarations: [ScreenReaderComponent],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)],
})
export class ScreenReaderModule {
  constructor() {
  }
}
