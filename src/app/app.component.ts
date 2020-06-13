import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationService } from "./_services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.auth.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
