import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  data: any = {};
  id:any;

  constructor(public authService: AuthService, private alertify: AlertifyService ,private route:Router) { }

  ngOnInit(){
    this.getLoggedInUser();

  }

  login() {
    this.authService.login(this.data).subscribe(next => {
     this.alertify.success('login successful');
    }, (error) => {
      this.alertify.error('failed to login');
    },()=>{
      this.route.navigate(['userlist']);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();


  }

  loggedOut(){
    localStorage.removeItem('token');
    this.alertify.success('logged out successfuly');
    this.route.navigate(['home']);
  }

  getLoggedInUser(){
    const title = localStorage.getItem('id')
    this.id = title;
    console.log(this.id)

  }

}
