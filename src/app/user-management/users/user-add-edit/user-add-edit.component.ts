import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/shared/stores/app.selector';
import { Appstate } from 'src/app/shared/stores/appstate';
import { Users } from '../store/users';
import { invokeSaveNewUserAPI, invokeUpdateUserAPI } from '../store/users.action';
import { switchMap } from 'rxjs';
import { selectUserById } from '../store/users.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dropdownSettingsConfig, placehoder, validationPattern, commonMessage } from 'src/app/shared/constants/constant';

declare var window: any;

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css'],
})
export class UserAddEditComponent implements OnInit {

  placeholderValue: any = placehoder.pleaseEnter;
  placeholderValueSelect: any = placehoder.pleaseSelect;
  dropdownSettingsConf: any = dropdownSettingsConfig;
  userForm: Users = new Users();
  userPayload: any;
  gender: any;
  roles: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {}
  formGroup: FormGroup;
  ShowFilter: boolean = true;
  mobPattern: any = validationPattern.mobileNumber;
  resetForm: string = commonMessage.resetForm;
  pageTitle: string = 'Add A New User';
  @ViewChild('dialogModal') dialogModal!: ElementRef;
  modalPopup:any;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    public route: ActivatedRoute,
  ) { }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }

  onItemDeSelect(item: any) {
    let id = item.id;
    this.selectedItems = this.selectedItems.filter((item: any) => item.id !== id);
  }

  onItemDeSelectAll(item: any) {
    this.selectedItems = []
  }

  onSelectAll(items: any) {
    this.selectedItems = items;
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

    this.initializeFormControls();
    this.dropdownSettings = this.dropdownSettingsConf;
    if (this.route.snapshot.params['page'] == 'edit') {
      this.onEditUser();
    }

  }

  // On Edit User
  onEditUser() {
    this.pageTitle = 'Update User'
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
        this.formGroup.controls['dob'].setValue(new Date(editData.dob))
        this.formGroup.valueChanges.subscribe((val) => this.userPayload = val)
        // this.userPayload = this.formGroup.value;
      }
      else {
        this.router.navigate(['/list-user']);
      }
    });
  }

  // Save User
  save() {
    if (this.formGroup.status == 'INVALID') {
      this.formGroup.markAllAsTouched();
      return
    }
    this.userPayload = this.formGroup.value
    this.userPayload.password = 'admin#123';
    this.userPayload.role = this.selectedItems;

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

  // On Update User
  update() {
    if (this.formGroup.status == 'INVALID') {
      this.formGroup.markAllAsTouched();
      return
    }
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

  openDialog() {
    this.modalPopup = new window.bootstrap.Modal(this.dialogModal.nativeElement);
    this.modalPopup.show();
  }

  reset() {
    this.formGroup.reset();
    this.modalPopup.hide();
  }

  // Disabled Form Controls
  disabledField = () => {
    this.formGroup.get('email')!.disable();
  }

  handleUpload(error: string | null) {
    if (error) {
      // Handle error here, e.g., display an error message
    } else {
      // Handle successful upload, e.g., refresh data or show a success message
    }
  }

  //Initialize Form Controls
  initializeFormControls() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      mobileNo: new FormControl('', [Validators.required, Validators.pattern(this.mobPattern)]),
      gender: new FormControl('', [Validators.required, Validators.minLength(2)]),
      dob: new FormControl(''),
      role: new FormControl(this.selectedItems, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      _id: new FormControl(''),
      password: new FormControl(''),
    })
  }

}
