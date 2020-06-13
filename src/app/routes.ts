import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./list/list.component";
import { MessagesComponent } from "./messages/messages.component";
import { UserlistComponent } from "./user/userlist/userlist.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AuthguardGuard } from "./_guards/authguard.guard";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { UserDetailResolver } from "./_resolvers/user-detail.resolver";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
export const appRoute: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "",
    // runGuardsAndResolvers: "always",
    canActivate: [AuthguardGuard],
    children: [
      { path: "list", component: ListComponent },
      { path: "messages", component: MessagesComponent },
      { path: "userlist", component: UserlistComponent, pathMatch: "full" },
      {
        path: "user/:id",
        component: UserDetailsComponent,
        resolve: { i: UserDetailResolver },
      },
      {
        path: "users/edit/:id",
        component: UserEditComponent,
        resolve: { user: UserDetailResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
    ],
  },

  { path: "dashboard", component: UserDashboardComponent },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];
