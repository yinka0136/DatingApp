import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.endsWith('login') || req.url.endsWith('register')) {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`

      }
    });

    return next.handle(req);
  }

}
