import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Users } from '../store/users';
import { invokeSaveNewUserAPI, invokeUpdateUserAPI } from '../store/users.action';
import { switchMap } from 'rxjs';
import { selectUserById } from '../store/users.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { placehoder } from 'src/app/shared/constant/constant';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  placeholderValue: any = placehoder.pleaseEnter
  userForm: Users = new Users();
  userPayload: any;
  gender: any;
  role: any;

  formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    _id: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    public route: ActivatedRoute,
  ) {
  }

  update() {
    if (this.userPayload != undefined) {
      this.userPayload._id = this.userForm._id
      this.userPayload.email = this.formGroup.get('email')!.value;
      this.userPayload.password = this.userForm.password
      this.store.dispatch(
        invokeUpdateUserAPI({ updateUser: { ...this.userPayload } })
      );
      let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.router.navigate(['/list-user']);
        }
      });
    }
    else { 
      this.router.navigate(['/list-user']); 
    }
  }

  ngOnInit(): void {
    this.gender = [
      { name: 'Select', value: '' },
      { name: 'Male', value: 'Male' },
      { name: 'Female', value: 'Female' }
    ]

    this.role = [
      { name: 'Select', value: '' },
      { name: 'Admin', value: 'Admin' },
      { name: 'Super Admin', value: 'Super Admin' }
    ]

    if (this.route.snapshot.params['page'] == 'edit') {
      this.disabledField()
      let fetchData$ = this.route.paramMap.pipe(
        switchMap((params) => {
          return this.store.pipe(select(selectUserById(params.get('id'))));
        })
      );
      fetchData$.subscribe((data) => {
        if (data) {
          this.userForm = { ...data };
          let editData: any = this.userForm
          this.formGroup.setValue(editData);
          this.formGroup.valueChanges.subscribe((val) => this.userPayload = val)
          console.log(this.userPayload)
          // this.userPayload = this.formGroup.value;
        }
        else {
          this.router.navigate(['/list-user']);
        }
      });
    }
  }

  save() {
    if (this.formGroup.status == 'INVALID') {
      this.formGroup.markAllAsTouched();
      return
    }
    this.userPayload = this.formGroup.value
    this.userPayload.password = 'admin#123';
    this.store.dispatch(invokeSaveNewUserAPI({ newUser: this.userPayload }))
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        // this.appStore.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        // );
        this.router.navigate(['/list-user']);
      }
    });
  }

  // Disabled Function
  disabledField = () => {
    this.formGroup.get('email')!.disable();
  }



}
