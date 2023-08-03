import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { UsersService } from "../../users/users.service";
import { invokeLoginAPI, loginApiSuccess } from "./login.action";
//import { selectUsers } from './users.selector';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private commonService: CommonService,
    private store: Store,
  ) { }


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeLoginAPI),
      switchMap((action) => {
        // this.appStore.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        // );
        return this.usersService.login(action.login).pipe(
          map((data) => {
            this.commonService.returnSuccessMessage();
            this.commonService.setUserInStorage(data)
            return loginApiSuccess({ login: data });
          }),
          catchError((error) => {
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    );
  });

}
