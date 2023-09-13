
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';

@Injectable({
    providedIn: 'root',
})

export class ApiHelper {

    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }

    get<T>(endpoint: string): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.get<T>(url, { headers: this.commonService.getTokenHeader() });
    }

    post<T>(endpoint: string, payload: any): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.post<T>(url, payload, { headers: this.commonService.getTokenHeader() })
    }

    patch<T>(endpoint: string, payload: any): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.patch<T>(url, payload, { headers: this.commonService.getTokenHeader() })
    }

    delete<T>(endpoint: string): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.delete<T>(url, { headers: this.commonService.getTokenHeader() })
    }

    postNoToken<T>(endpoint: string, payload: any): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.post<T>(url, payload, { headers: this.commonService.getHeaderContentTypeOnly() })
    }

    postUpload<T>(endpoint: string, payload: any): Observable<T> {//TODO
        //const url = `${environment.APIUrl}${endpoint}`;
        let header: any
        header = {
          'Authorization': 'Bearer Bearer eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJTYW5qZWV2IiwibGFzdE5hbWUiOiJHdXB0YSIsInN1YiI6InNhbmplZXYuZ3VwdGFAYXVyaW9ucHJvLmNvbSIsInVzZXJwcm9maWxlSWQiOjIwODcyLCJleHAiOjE2OTQ1OTEyNjAsImlhdCI6MTY5NDU4NDA2MCwib3JnSWQiOjF9.3SzuVCnSoNVoISCEjs5-weKDeyg6cR8_UVXvjF8_iGU'
        }

        return this.http.post<T>(endpoint, payload, { headers: header })
    }

}
