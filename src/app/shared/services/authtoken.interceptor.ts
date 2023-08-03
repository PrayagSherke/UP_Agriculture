import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, exhaustMap } from "rxjs";
import { Store } from "@ngrx/store";
import { Appstate } from "../store/appstate";
import { getToken } from "src/app/user-management/login/store/login.selector";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<Appstate>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      exhaustMap((token) => {
        console.log(token);
        if (!token) {
          return next.handle(req);
        }
        let modifiedReq = req.clone({
          params: req.params.append('auth', token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}