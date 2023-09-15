import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { UsersService } from "../../users/users.service";
import { invokeLoginAPI, loginApiSuccess } from "./login.action";
import { CommonService } from 'src/app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonMessage} from 'src/app/shared/constants/constant'

@Injectable()
export class LoginEffect {

  matSnakDuration:any = commonMessage.snackBarDuration;

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private commonService: CommonService,
    private store: Store,
    private snackBar:MatSnackBar
  ) { }


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeLoginAPI),
      switchMap((action) => {
        return this.usersService.login(action.login).pipe(
          map((data:any) => {
            this.snackBar.open(data.message, 'X', {
              duration:this.matSnakDuration,
              panelClass:['green-snackbar']
            })
            this.commonService.returnSuccessMessage(data);
            this.commonService.setUserDataInStorage(data)
            return loginApiSuccess({ login: data });
          }),
          catchError((error) => {
            this.snackBar.open(error.error.error.message, 'X', {
              duration:this.matSnakDuration,
              panelClass:['red-snackbar']
            })
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    );
  });

}
