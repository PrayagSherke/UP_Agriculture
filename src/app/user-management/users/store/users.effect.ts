import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { UsersService } from '../users.service';
import {
  usersFetchAPISuccess,
  deleteUserAPISuccess,
  invokeUsersAPI,
  invokeDeleteUserAPI,
  invokeSaveNewUserAPI,
  invokeUpdateUserAPI,
  saveNewUserAPISucess,
  updateUserAPISucess,
} from './users.action';
import { selectUsers } from './users.selector';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private commonService: CommonService,
    private store: Store,
  ) { }

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUsersAPI),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      mergeMap(([, userformStore]) => {
        if (userformStore.length > 0) {
          return EMPTY;
        }
        this.commonService.showLoading();
        return this.usersService.get().pipe(
          map((data) => {
            this.commonService.hideLoading();
            return usersFetchAPISuccess({ allUsers: data })
          }),
          catchError((error) => {
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    )
  );

  saveNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewUserAPI),
      switchMap((action) => {
        // this.appStore.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        // );
        return this.usersService.create(action.newUser).pipe(
          map((data) => {
            this.commonService.returnSuccessMessage();
            return saveNewUserAPISucess({ newUser: data });
          }),
          catchError((error) => {
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    );
  });

  updateUserAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateUserAPI),
      switchMap((action) => {
        // this.appStore.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } })
        // );
        
        this.commonService.showLoading();
        return this.usersService.update(action.updateUser).pipe(
          map((data) => {
            this.commonService.returnSuccessMessage();
            return updateUserAPISucess({ updateUser: data });
          }),
          catchError((error) => {
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    );
  });

  deleteUsersAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteUserAPI),
      switchMap((actions) => {
        // this.appStore.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        // );
        return this.usersService.delete(actions.id).pipe(
          map(() => {
            this.commonService.returnSuccessMessage();
            return deleteUserAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
