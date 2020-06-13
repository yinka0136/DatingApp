import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { User } from "src/app/_models/user";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "src/app/_services/user.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthenticationService } from "src/app/_services/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  @HostListener("window: beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
      console.log(this.user);
    });
  }

  updateUser() {
    this.userService.updateUser(this.auth.decodedToken.id, this.user).subscribe(
      (next) => {
        this.alertify.success("profile updated successfully");
        this.editForm.reset(this.user);
      },
      (error) => {
        this.alertify.error("Your profile couldnt be updated");
      }
    );
  }
}
