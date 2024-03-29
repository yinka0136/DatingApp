import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError, map,  } from 'rxjs/operators';

@Injectable()
export class UserDetailResolver implements Resolve<User>{
  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService){}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
      map((result)=>{
        return result['message'];
      }),
      catchError(error =>{
        this.alertify.error('An error occured while fetching data')
        this.router.navigate(['/userlist']);
        return of(null);
      })
    )
  }
  // resolve(route: ActivatedRouteSnapshot): Observable<User> {

  //   const userDeets = this.userService.getUser(route.params['id']);

  //   return userDeets.pipe(
  //     map(response => {
  //       return response;

  //     }),
  //     catchError(error => {
  //       return of(null);
  //     })
  //   )

  // }


}
