import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Users } from '../store/users';
import { invokeSaveNewUserAPI, invokeUpdateUserAPI } from '../store/users.action';
import { switchMap } from 'rxjs';
import { selectUserById } from '../store/users.selector';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { dropdownSettingsConfig, placehoder } from 'src/app/shared/constant/constant';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  placeholderValue: any = placehoder.pleaseEnter;
  placeholderValueSelect: any = placehoder.pleaseSelect;
  dropdownSettingsConf:any = dropdownSettingsConfig;
  userForm: Users = new Users();
  userPayload: any;
  gender: any;
  roles: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {}
  formGroup: FormGroup;
  ShowFilter: boolean = true;

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

  onItemSelect(item: any) {
    this.selectedItems.push(item);
    console.log(this.selectedItems)
  }

  onItemDeSelect(item: any) {
    let id = item.id;
    this.selectedItems = this.selectedItems.filter((item: any) => item.id !== id);
    console.log(this.selectedItems);
  }

  onItemDeSelectAll(item: any) {
    this.selectedItems = []
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    this.selectedItems = items;
    console.log(this.selectedItems);
  }

  ngOnInit(): void {

    this.gender = [
      { name: 'Select', value: '' },
      { name: 'Male', value: 'Male' },
      { name: 'Female', value: 'Female' }
    ]

    this.roles = [
      { id: 1, value: 'New Delhi' },
      { id: 2, value: 'Mumbai' },
      { id: 3, value: 'Bangalore' },
      { id: 4, value: 'Pune' },
      { id: 5, value: 'Chennai' },
      { id: 6, value: 'Navsari' }
    ];
    // this.selectedItems = [
    //   { id: 1, value: 'New Delhi' },
    //   { id: 2, value: 'Mumbai' },
    // ]

    this.dropdownSettings = this.dropdownSettingsConf;

    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl(null,),
      role: new FormControl(this.selectedItems, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      _id: new FormControl(''),
      password: new FormControl(''),

    })

    if (this.route.snapshot.params['page'] == 'edit') {
      debugger;
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
          console.log(editData.dob);
          this.formGroup.controls['dob'].setValue(new Date(editData.dob))  
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
    debugger;
    if (this.formGroup.status == 'INVALID') {
      this.formGroup.markAllAsTouched();
      return
    }
    this.userPayload = this.formGroup.value
    this.userPayload.password = 'admin#123';
    this.userPayload.role = this.selectedItems;

    console.log(this.userPayload);
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
