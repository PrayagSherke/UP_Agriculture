import { Component, OnInit } from '@angular/core';
//import { Login } from './store/login';
import { Appstate } from 'src/app/shared/stores/appstate';
import { Store, select } from '@ngrx/store';
import { invokeLoginAPI } from './store/login.action';
import { selectAppState } from 'src/app/shared/stores/app.selector';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { placehoder } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any
  placeholderValue: any = placehoder.pleaseEnter;
  isPassword: boolean = false;
  formGroup: FormGroup;

  constructor(
    private appStore: Store<Appstate>,
    private store: Store,
    private router: Router
  ) {

  }

  login() {
    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      return
    }
    this.loginForm = this.formGroup.value
    this.store.dispatch(invokeLoginAPI({ login: this.loginForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.router.navigate(['/list-user'])
      }
    })
  }

  generateOtp() {
    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      return
    }
    this.loginForm = this.formGroup.value;
    console.log(this.loginForm)
  }

  togglePassword(item: string) {
    // this.isPassword = item !== 'OTP';
    if(item === 'PASSWORD') {
      this.isPassword = true;
      this.initializeFormControlsWithPassword()
    }
    else {
      this.isPassword = false
    }
  }

  initializeFormControlsWithPassword() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  initializeFormControlsWithOtp() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    this.initializeFormControlsWithOtp() //Default is OTP based login
  }

}
