import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './store/users';
import { environment } from 'src/environments/environment';
import { Login } from '../login/store/login';
import { CommonService } from 'src/app/shared/services/common.service';
import { ApiHelper } from 'src/app/shared/helper/api.helper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODgzNTk3OTIsImV4cCI6MTY4ODQwMjk5MiwiYXVkIjoiNjQ5ZTdmZjI1YzU3NWNhN2E1MGUzNTVjIiwiaXNzIjoibXlzaXRlLmNvbSJ9.tucWND9ziPnP7jLcBimNuwzSNFRKgCTf7fzX4L-hhgw'

  constructor(
    private http: HttpClient, 
    private commonService:CommonService,
    private apiHelper: ApiHelper) { }
  
  get() {
    const endpoint = 'auth/register'; 
    return this.apiHelper.get<Users[]>(endpoint);
  }

  create(payload: Users) {
    const endpoint = 'auth/register'
    return this.apiHelper.post<Users>(endpoint, payload)
    //return this.http.post<Users>(url, payload, { headers: this.commonService.getTokenHeader() });
  }

  login(payload:Login) {
    let header: any;
    header = {
      'Content-Type': 'application/json',
    }; 
    const url = `${environment.APIUrl}auth/login`
    return this.http.post<Login>(url, payload, {headers:header})
  }
  
  update(payload: Users) {
    const endpoint = 'auth/register';
    return this.apiHelper.patch<Users>(endpoint, payload)
  }

  delete(_id: any) {
    const endpoint = `auth/register/${_id}`
    return this.apiHelper.delete(endpoint)
  }

}
