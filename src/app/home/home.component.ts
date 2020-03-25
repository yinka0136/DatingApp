import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseUrl = 'http://localhost:8080/';
  registerMode = false;
  values: any;

  constructor(private http: HttpClient , private authService: AuthService) { }

  ngOnInit(): void {

  }

  isRegisterMode(){
    return this.registerMode = true;
  }

  getValues() {
    return this.http.get('http://localhost:8080/login/bills').subscribe(Response => {
      this.values = Response;
      console.log(this.values);
    }, error => {
      console.log(error);
    });

}

cancelRegisterMode(registerMode: Boolean){
  this.registerMode = false;
}


}
