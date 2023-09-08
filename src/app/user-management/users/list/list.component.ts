import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/shared/stores/app.selector';
import { Appstate } from 'src/app/shared/stores/appstate';
import { invokeUsersAPI, invokeDeleteUserAPI } from '../store/users.action';
import { selectUsers } from '../store/users.selector';
import { Users } from '../store/users';
import { TableAction } from 'src/app/shared/components/table/table-column';
import { Sort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMON_COLUMNS, CommonColumnsType } from 'src/app/user-management/users/list/common.columns'
import { CommonService } from 'src/app/shared/services/common.service';

declare var window: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {

  userData!: Users[];
  usersTableColumns: CommonColumnsType = COMMON_COLUMNS;
  tableActions: TableAction[] = [];
  count: number
  userName: string = '';
  deleteText: string = 'Are you sure you want to delete';
  paramValue: any = ''

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    public route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  users$ = this.store.pipe(select(selectUsers));

  deleteModal: any;
  idToDelete: number = 0;

  initializeActionColumns(): void {
    this.tableActions = [
      {
        icon: 'delete',
        handler: (row: any) => {
          this.removeUser(row)
        }
      },
      {
        icon: 'edit',
        handler: (row: any) => {
          this.editUser(row._id)
        }
      },
    ];
  }

  removeUser(user: any) {
    this.userName = `${this.deleteText} ${user.firstName} ${user.lastName} ?`
    this.idToDelete = user._id;
    this.deleteModal.show();
  }

  editUser(id: any) {
    this.router.navigate(['list-user/edit-user', id, 'edit'])
  }

  sortData(sortParameters: Sort) {
    const keyName: any = sortParameters.active[0];
    if (sortParameters.direction === 'asc') {
      this.userData = [...this.userData].sort((a: Users, b: Users) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.userData = [...this.userData].sort((a: Users, b: Users) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.userData = this.userData;
    }
  }


  users() {
    this.users$.subscribe(data => {
      this.userData = data;
      // Bind Multiple Roles
      if (this.userData.length > 0) {
        const modifiedUserData = this.userData.map(user => {
          const updateUser = { ...user };
          updateUser.dob = this.commonService.formatDDMMYYYY(updateUser.dob);
          updateUser.role = user.role.map((roleItem: any) => roleItem.value).join(', ')
          return updateUser
        })
        this.userData = modifiedUserData;
      }
      this.count = this.userData.length
    })
  }
 
  ngOnInit(): void {

    // this.initializeColumns();
    this.initializeActionColumns();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
   
    this.route.queryParams.subscribe((queryParam) => {
      this.paramValue = queryParam['prop'];
    })

    if (this.paramValue == 'back') {
      this.users()
      return
    }
    else {
      this.store.dispatch(invokeUsersAPI());
      this.users()
    }
  }

  delete() {
    this.store.dispatch(
      invokeDeleteUserAPI({
        id: this.idToDelete,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        // this.appStore.dispatch(
        //   setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        // );
      }
    });
  }
}
