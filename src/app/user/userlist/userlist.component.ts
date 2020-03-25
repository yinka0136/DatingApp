import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { User } from "src/app/_models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { PaginatedResult, Pagination } from "src/app/_models/pagination";

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.css"]
})
export class UserlistComponent implements OnInit {
  users: User[];
  pagination: Pagination = {
    totalElements: 0,
    last: false,
    totalPages: 0,
    size: 4,
    number: 0
  };
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(data =>{
    //   this.users = data['users'];
    //   console.log(this.users);
    // })

    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.number, this.pagination.size)
      .subscribe(rez => {
        console.log(rez);
        this.users = rez.content;
        this.pagination = rez.pageable;
        this.pagination.size = 4;
        this.pagination.totalElements = rez.totalElements;
        this.pagination.totalPages = rez.totalPages;
        console.log(this.pagination);

        // this.users = users.result;
        // console.log(this.users);
      });
  }
  pageChanged(event: any): void {
    console.log(event);
    this.userService.getUsers(event.page - 1, event.itemsPerPage).subscribe({
      next: res => {
        this.users = res.content;
      },
      error: e => {
        console.log(e);
      }
    });
    this.pagination.number = event.page;
    // this.router.navigate([]);
    console.log(this.pagination.number);
  }
}
