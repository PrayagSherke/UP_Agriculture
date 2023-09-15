import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Appstate } from 'src/app/shared/stores/appstate';
import { Users } from '../store/users';
import { selectUserById } from '../store/users.selector';
import { dateFormate } from 'src/app/shared/constants/constant'

@Component({
  selector: 'app-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})

export class UserViewComponent implements OnInit {

  userForm: Users = new Users()
  ddMMyyyy = dateFormate.ddMMyyyy;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  // Get User Details
  getUserDetails() {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id: any = params.get('id');
        return this.store.pipe(select(selectUserById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.userForm = { ...data };
        console.log(this.userForm)
      }
      else {
        this.router.navigate(['/list-user']);
      }
    });
  }

}
