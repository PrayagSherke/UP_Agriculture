import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './store/users';
import { Login } from '../login/store/login.model';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';

@Injectable({
  providedIn: 'root',
})

export class UsersService {

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

  createUser(payload: Users) {
    const endpoint = 'auth/register'
    return this.apiHelper.post<Users>(endpoint, payload)
  }

  updateUser(payload: Users) {
    const endpoint = 'auth/register';
    return this.apiHelper.patch<Users>(endpoint, payload)
  }

  deleteUser(_id: any) {
    const endpoint = `auth/register/${_id}`
    return this.apiHelper.delete(endpoint)
  }
    

}
