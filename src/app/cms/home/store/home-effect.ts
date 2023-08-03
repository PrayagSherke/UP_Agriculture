import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { UsersService } from "../../users/users.service";
import { invokeHomeAPI, homeApiSuccess } from "./home.action";
//import { selectUsers } from './users.selector';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable()
export class HomeEffect {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private commonService: CommonService,
    private store: Store,
  ) { }


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeHomeAPI),
      switchMap((action) => {
        // this.appStore.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        // );
        return this.usersService.login(action.home).pipe(
          map((data) => {
            this.commonService.returnSuccessMessage();
            this.commonService.setUserInStorage(data)
            return homeApiSuccess({ home: data });
          }),
          catchError((error) => {
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    );
  });

}
