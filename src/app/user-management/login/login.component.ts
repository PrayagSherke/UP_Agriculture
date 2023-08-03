import { Component, OnInit } from '@angular/core';
//import { Login } from './store/login';
import { Appstate } from 'src/app/shared/store/appstate';
import { Store, select } from '@ngrx/store';
import { invokeLoginAPI } from './store/login.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { placehoder } from 'src/app/shared/constant/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loginForm: any
  placeholderValue:any = placehoder.pleaseEnter
  constructor(
    private appStore: Store<Appstate>,
    private store: Store,
    private router: Router
  ) {
    this.formGroup.valueChanges.subscribe((val) => this.loginForm = val)

  }

  login() {
    if (this.formGroup.status == "INVALID") {
     this.formGroup.markAllAsTouched();
      // this.formGroup.markAsDirty();
      return
    }
    console.log(this.loginForm)
    this.store.dispatch(invokeLoginAPI({ login: this.loginForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.router.navigate(['/list-user'])
      }
    })
  }

  ngOnInit(): void {
   
  }

}
