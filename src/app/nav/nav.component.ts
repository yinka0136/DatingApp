import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";
import { AuthService, SocialUser } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angularx-social-login";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  data: any = {};
  id: any;
  private user: SocialUser;

  constructor(
    public authService: AuthenticationService,
    private alertify: AlertifyService,
    private route: Router,
    private socialAuth: AuthService
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
    this.socialAuth.authState.subscribe((user) => {
      this.user = user;
      // this.loggedIn = (user != null);
      console.log(user);
    });
  }

  login() {
    this.authService.login(this.data).subscribe(
      (next) => {
        this.alertify.success("login successful");
      },
      (error) => {
        this.alertify.error("failed to login");
      },
      () => {
        this.route.navigate(["userlist"]);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem("token");
    this.alertify.success("logged out successfuly");
    this.route.navigate(["home"]);
  }

  getLoggedInUser() {
    const title = localStorage.getItem("id");
    this.id = title;
    console.log(this.id);
  }

  signInWithGoogle(): void {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuth.signOut();
  }
}
