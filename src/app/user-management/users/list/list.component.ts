import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeUsersAPI, invokeDeleteUserAPI } from '../store/users.action';
import { selectUsers } from '../store/users.selector';
import { Users } from '../store/users';
import { TableAction, TableColumn } from 'src/app/shared/components/table/table-column';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  userData!: Users[];
  usersTableColumns!: TableColumn[];
  tableActions: TableAction[] = [];
  isShowList: boolean = true;
  isShowGrid: boolean = false;
  count: number
  userName: string='';
  deleteText: string='Are you sure you want to delete';

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
  ) {

    this.users$.subscribe(data => {
      this.userData = data;
      // Bind Multiple Roles
      const modifiedUserData = this.userData.map(user => {
        const updateUser = { ...user };
        updateUser.role = user.role.map((roleItem: any) => roleItem.value).join(', ')
        return updateUser
      })
      this.userData = modifiedUserData;
      this.count = this.userData.length
    })
  }

  users$ = this.store.pipe(select(selectUsers));

  deleteModal: any;
  idToDelete: number = 0;

  initializeColumns(): void {
    this.usersTableColumns = [
      {
        name: 'Name',
        dataKey: ['firstName', 'lastName'],
        position: 'left',
        isSortable: true
      },
      {
        name: 'Email',
        dataKey: ['email'],
        position: 'center',
        isSortable: true
      },
      {
        name: 'Mobile No',
        dataKey: ['mobileNo'],
        position: 'left',
        isSortable: true
      },
      {
        name: 'Role',
        dataKey: ['role'],
        position: 'left',
        isSortable: true
      },
    ];
  }

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

  showList() {
    this.isShowList = true
    this.isShowGrid = false
  }
  showGrid() {
    this.isShowList = false
    this.isShowGrid = true
  }
  removeUser(user: any) {
    console.log(user);
    this.userName = `${this.deleteText} ${user.firstName} ${user.lastName} ?` 
    this.idToDelete = user._id;
    this.deleteModal.show();
    // this.userData = this.userData.filter(item => item._id !== user._id);
  }

  editUser(id: any) {
    this.router.navigate(['list-user/edit-user', id, 'edit'])
  }

  sortData(sortParameters: Sort) {
    console.log(sortParameters)
    const keyName: any = sortParameters.active[0];
    console.log(keyName)
    if (sortParameters.direction === 'asc') {
      this.userData = [...this.userData].sort((a: Users, b: Users) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.userData = [...this.userData].sort((a: Users, b: Users) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.userData = this.userData;
    }
  }

  ngOnInit(): void {

    this.initializeColumns();
    this.initializeActionColumns();

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.store.dispatch(invokeUsersAPI());
  }


  openDeleteModal(id: any) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    debugger;
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
