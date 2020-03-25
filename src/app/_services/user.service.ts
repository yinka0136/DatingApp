import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Bills } from "../_models/bills";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(number?, size?): Observable<PaginatedResult<User[]>> {
    let paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();
    if (number != null && size != null) {
      params = params.set("page", number);
      params = params.set("size", size);
    }
    return this.http
      .get<PaginatedResult<User[]>>(this.baseUrl + "/users", {
        observe: "response",
        params
      })
      .pipe(
        map(response => {
          paginatedResult = response.body;
          // if (response["pageable"] != null) {
          //   paginatedResult.pageable = JSON.parse(response["pageable"]);
          // }
          return paginatedResult;
        })
      );
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/user/" + id);
  }

  getBills(): Observable<Bills> {
    return this.http.get<Bills>(this.baseUrl + "/bills");
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + "/user/" + id, user);
  }
}
