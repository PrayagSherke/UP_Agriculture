
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
        console.log('API CALLED')
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

}
