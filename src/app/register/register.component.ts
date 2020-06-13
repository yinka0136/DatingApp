import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker/public_api";
import { Router } from "@angular/router";
import { User } from "../_models/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  registerForm: FormGroup;
  @Input() billsFromHome: any;
  @Output() cancelMOde = new EventEmitter();
  user: User;

  constructor(
    private auth: AuthenticationService,
    private alert: AlertifyService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    (this.bsConfig = {
      containerClass: "theme-red",
    }),
      this.createRegisterForm();
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('',Validators.required)
    // }, this.passwordMatchValidator)
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["male"],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      let payload: any = {};
      payload = Object.assign({}, this.registerForm.value);
      delete payload.confirmPassword;
      console.log(payload);
      this.auth.register(payload).subscribe(
        (next) => {
          this.alert.success("registration successful");
        },
        (error) => {
          this.alert.error(
            "Registration failed please ensure that you fill the form correctly"
          );
        },
        () => {
          this.auth.login(payload).subscribe((next) => {
            this.route.navigate(["/userlist"]);
          });
        }
      );
    }

    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelMOde.emit(false);
    console.log("cancelled");
  }
}
