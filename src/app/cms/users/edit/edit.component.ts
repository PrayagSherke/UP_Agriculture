import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Users } from '../store/users';
import { invokeUpdateUserAPI } from '../store/users.action';
import { selectUserById } from '../store/users.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  userForm:Users = new Users()
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  // userForm: Users = {
  //   _id: 0,
  //   email: '',
  //   firstName: '',
  //   lastName:'',
  //   mobileNo: '',
  //   role:'',
  //   gender:'',
  //   password:''
  // };

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id:any = params.get('id');
        return this.store.pipe(select(selectUserById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.userForm = { ...data };
      }
      else{
        this.router.navigate(['/list-user']);
      }
    });
  }

  update() {
    this.store.dispatch(
      invokeUpdateUserAPI({ updateUser: { ...this.userForm } })
    );
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

  
}
