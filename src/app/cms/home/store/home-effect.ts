import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { invokeHomeAPI, homeApiSuccess } from "./home.action";
//import { selectUsers } from './users.selector';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable()
export class HomeEffect {
  constructor(
    private actions$: Actions,
    private commonService: CommonService,
    private store: Store,
  ) { }



}
