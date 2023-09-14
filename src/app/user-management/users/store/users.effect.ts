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
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonMessage} from 'src/app/shared/constants/constant'


@Injectable()
export class UsersEffect {

  matSnakDuration:any = commonMessage.snackBarDuration;

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private commonService: CommonService,
    private store: Store,
    private snackBar: MatSnackBar,
  ) { }

  // All Users
  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUsersAPI),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      mergeMap(([, userformStore]) => {
        // if (userformStore.length > 0) {// After update the user list not refreshed
        //   return EMPTY;
        // }
        this.commonService.showLoading();
        
        return this.usersService.getUsers().pipe(
          map((data) => {
            this.commonService.hideLoading();
            return usersFetchAPISuccess({ allUsers: data })
          }),
          catchError((error) => {
            this.snackBar.open(error.error.error.status, 'X', {
              duration: this.matSnakDuration,
              panelClass: ['red-snackbar'],
            });
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    )
  );

  // Save User
  saveNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewUserAPI),
      switchMap((action) => {
        return this.usersService.createUser(action.newUser).pipe(
          map((data) => {
            this.snackBar.open(data.message, 'X', {
              duration: this.matSnakDuration,
              panelClass: ['green-snackbar'],
            });
            this.commonService.returnSuccessMessage(data);
            return saveNewUserAPISucess({ newUser: data });
          }),
          catchError((error) => {
            this.snackBar.open(error.error.error.message, 'X', {
              duration: this.matSnakDuration,
              panelClass: ['red-snackbar'],
            });
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    );
  });

  // Update User
  updateUserAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateUserAPI),
      switchMap((action) => {
        this.commonService.showLoading();
        return this.usersService.updateUser(action.updateUser).pipe(
          map((data) => {
            this.snackBar.open(data.message, 'X', {
              duration: this.matSnakDuration,
              panelClass: ['green-snackbar'],
            });
            this.commonService.returnSuccessMessage(data);
            return updateUserAPISucess({ updateUser: data });
          }),
          catchError((error) => {
            this.snackBar.open(error.error.error.message, 'X', {
              duration: this.matSnakDuration,
              panelClass: ['red-snackbar'],
            });
            return this.commonService.returnErrorMessage(error);
          })
        );
      })
    );
  });

  // Delete User
  deleteUsersAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteUserAPI),
      switchMap((actions) => {
        return this.usersService.deleteUser(actions.id).pipe(
          map((data:any) => {
            this.snackBar.open(data.message, 'X', {
              duration: this.matSnakDuration,
              panelClass: ['red-snackbar'],
            });
            this.commonService.returnSuccessMessage(data);
            return deleteUserAPISuccess({ id: actions.id });
          }),
          catchError((error) => {
            return this.commonService.returnErrorMessage(error)
          })
        );
      })
    );
  });
}
