import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './store/users';
import { environment } from 'src/environments/environment';
import { Login } from '../login/store/login';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODgzNTk3OTIsImV4cCI6MTY4ODQwMjk5MiwiYXVkIjoiNjQ5ZTdmZjI1YzU3NWNhN2E1MGUzNTVjIiwiaXNzIjoibXlzaXRlLmNvbSJ9.tucWND9ziPnP7jLcBimNuwzSNFRKgCTf7fzX4L-hhgw'

  constructor(private http: HttpClient, private commonService:CommonService) { }
  get() {
    const url = `${environment.APIUrl}auth/register`
    return this.http.get<Users[]>(url,  { headers: this.commonService.getTokenHeader() });
  }

  create(payload: Users) {
    const url = `${environment.APIUrl}auth/register`
    return this.http.post<Users>(url, payload, { headers: this.commonService.getTokenHeader() });
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
    const url = `${environment.APIUrl}auth/register`
    return this.http.patch<Users>(url,  payload, { headers: this.commonService.getTokenHeader() } );
  }

  delete(_id: any) {
    const url = `${environment.APIUrl}auth/register/${_id}`
    return this.http.delete(url, {headers:this.commonService.getTokenHeader()});
  }

}
