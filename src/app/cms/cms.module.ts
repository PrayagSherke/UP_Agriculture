import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
//import { AuthGuard } from "../shared/services/auth.guard";
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../cms/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'screen-reader',
    loadChildren: () =>
      import('../cms/screen-reader/screen-reader.module').then((m) => m.ScreenReaderModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)]
})
export class CMSModule { }
