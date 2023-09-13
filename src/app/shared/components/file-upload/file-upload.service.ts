import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';

@Injectable({
  providedIn: 'root',
})

export class FileUploadService {

  constructor(
    private http: HttpClient, 
    private apiHelper: ApiHelper) { }
  
    
   upload(payload: any) {
    debugger
    const formData = new FormData();
    formData.append('file', payload);
    const endpoint = 'https://ipmstest.aurionpro.com:8092/ipms/ipms/userprofile/uploadProfileImage'//TODO
    return this.apiHelper.postUpload<any>(endpoint, formData)
  }

}
