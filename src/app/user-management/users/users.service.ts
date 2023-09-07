import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './store/users';
import { Login } from '../login/store/login';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODgzNTk3OTIsImV4cCI6MTY4ODQwMjk5MiwiYXVkIjoiNjQ5ZTdmZjI1YzU3NWNhN2E1MGUzNTVjIiwiaXNzIjoibXlzaXRlLmNvbSJ9.tucWND9ziPnP7jLcBimNuwzSNFRKgCTf7fzX4L-hhgw'

  constructor(
    private http: HttpClient, 
    private apiHelper: ApiHelper) { }
  
    
  login(payload:Login) {
    const endpoint = 'auth/login'
    return this.apiHelper.postNoToken<Login>(endpoint, payload)
  }

  getUsers() {
    const endpoint = 'auth/register'; 
    return this.apiHelper.get<Users[]>(endpoint);
  }

  createUsers(payload: Users) {
    const endpoint = 'auth/register'
    return this.apiHelper.post<Users>(endpoint, payload)
  }

  updateUsers(payload: Users) {
    const endpoint = 'auth/register';
    return this.apiHelper.patch<Users>(endpoint, payload)
  }

  deleteUsers(_id: any) {
    const endpoint = `auth/register/${_id}`
    return this.apiHelper.delete(endpoint)
  }
  
  
 

  

}
