import { Injectable } from '@angular/core';
import { setAPIStatus } from 'src/app/shared/stores/app.action';
import { of } from 'rxjs'
import { Appstate } from '../stores/appstate';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonMessage } from '../constants/constant';


@Injectable({
  providedIn: 'root'
})

export class CommonService {

  matSnakDuration:any = commonMessage.snackBarDuration;
  constructor(
    private appStore: Store<Appstate>,
    private snackBar: MatSnackBar
    ) { }

  // HTTP Failure
  returnErrorMessage(error: any) {
    this.snackBar.open(error.error.error.status, 'X', {
      duration: this.matSnakDuration,
      panelClass: ['red-snackbar'],
    });
    
    return of(setAPIStatus({
      apiStatus: {
        // apiResponseMessage: error.error.error.message,
        apiStatus: error.error.error.status,
        isLoading: false
      },
    }))
  }

  // Http Success 
  returnSuccessMessage(success: any) {
    this.snackBar.open(success.message, 'X', {
      duration: this.matSnakDuration,
      panelClass: ['green-snackbar'],
    });

    this.appStore.dispatch(
      setAPIStatus({
        apiStatus: {
          // apiResponseMessage: success.message,
          apiStatus: 'success',
          isLoading: false
        },
      })
    );
  }

  // Convert String Date to DD-MM-YYYY Format
  formatDDMMYYYY(dateString: string) {
    const dateObject = new Date(dateString);
    const date = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear().toString();
    return `${date}-${month}-${year}`
  }

  // Show and Hide Loader
  showLoading() {
    this.appStore.dispatch(
      setAPIStatus({
        apiStatus: { 
           apiStatus: '', isLoading: true },
      })
    );
  }

  hideLoading() {
    this.appStore.dispatch(
      setAPIStatus({
        apiStatus: { 
          apiStatus: '', isLoading: false },
      })
    );
  }

  // Set Logged in user data in session storage
  setUserDataInStorage(user: any) {
    sessionStorage.setItem('USERDATA', JSON.stringify(user))
  }

  getAccessToken() {
    let userData: any = sessionStorage.getItem('USERDATA');
    let parseData = JSON.parse(userData);
    if (parseData != null) {
      return parseData.accessToken
    }
    else {
      return null
    }
  }

  // Set Token in header to use in API calling
  getTokenHeader() {
    let header: any
    header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAccessToken()
    }
    return header;
  }

  // Set content type in header
  getHeaderContentTypeOnly() {
    let header: any;
    header = {
      'Content-Type': 'application/json'
    }
    return header;
  }

}

