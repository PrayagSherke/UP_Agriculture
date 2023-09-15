import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable()
export class HomeEffect {
  constructor(
    private actions$: Actions,
    private commonService: CommonService,
    private store: Store,
  ) { }



}
