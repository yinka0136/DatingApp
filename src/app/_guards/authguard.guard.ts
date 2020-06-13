import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Injectable({
  providedIn: "root",
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private alert: AlertifyService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }
    this.alert.error("You have to be logged in");
    this.router.navigate(["home"]);
    return false;
  }
}
