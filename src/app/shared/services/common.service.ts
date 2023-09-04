import { Injectable } from '@angular/core';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { of } from 'rxjs'
import { Appstate } from '../store/appstate';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private appStore: Store<Appstate>) { }

  returnErrorMessage(error: any) {
    return of(setAPIStatus({
      apiStatus: {
        apiResponseMessage: error.error.error.message,
        apiStatus: error.error.error.status,
        isLoading:false
      },
    }))
  }

  returnSuccessMessage() {
    this.appStore.dispatch(
      setAPIStatus({
        apiStatus: { apiResponseMessage: 'Suceessfully', apiStatus: 'success', isLoading:false },
      })
    );
  }


  showLoading() {
    this.appStore.dispatch(
      setAPIStatus({
        apiStatus: { apiResponseMessage: '', apiStatus: '', isLoading:true },
      })
    );
  }

  hideLoading() {
    this.appStore.dispatch(
      setAPIStatus({
        apiStatus: { apiResponseMessage: '', apiStatus: '', isLoading:false },
      })
    );
  }

  setUserInStorage(user:any) {
    sessionStorage.setItem('USERDATA', JSON.stringify(user))
  }

  getAccessToken() {
    let userData:any = sessionStorage.getItem('USERDATA');
    let parseData = JSON.parse(userData);
    if(parseData !=null) {
      return parseData.accessToken
    }
    else {
      return null
    }
    
  }

  getTokenHeader() {
    let header:any ='';
    header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAccessToken()
    }
    return header;
  }
   
}

