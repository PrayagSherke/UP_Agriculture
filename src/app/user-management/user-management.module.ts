import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
//import { AuthGuard } from "../shared/services/auth.guard";
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../user-management/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'list-user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../user-management/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)]
})
export class UserManagementModule { }