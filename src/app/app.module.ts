import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { AuthServiceService } from "./interceptors/auth-service.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserlistComponent } from "./user/userlist/userlist.component";
import { ListComponent } from "./list/list.component";
import { MessagesComponent } from "./messages/messages.component";
import { appRoute } from "./routes";
import { UserCardComponent } from "./user/user-card/user-card.component";
import { UserDetailResolver } from "./_resolvers/user-detail.resolver";
import { AuthguardGuard } from "./_guards/authguard.guard";
import { UserService } from "./_services/user.service";
import { AlertifyService } from "./_services/alertify.service";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { PhotoEditorComponent } from "./user/photo-editor/photo-editor.component";
import { FileUploadModule } from "ng2-file-upload";
import { CommonModule } from "@angular/common";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "648266134944-pbb0c4elfgnt1ka81m47pmlmgl8jtb4b.apps.googleusercontent.com"
    ),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1061592434258551"),
  },
]);

export function provideConfig() {
  return config;
}
// import { UserEditResolver } from './_resolvers/user-edit.resolver ';
// import {NgxGalleryModule} from 'ngx-gallery';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UserDashboardComponent,
    UserlistComponent,
    ListComponent,
    UserEditComponent,
    MessagesComponent,
    UserCardComponent,
    PhotoEditorComponent,
    UserDetailsComponent,
  ],

  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoute),
    FileUploadModule,
    // NgxGalleryModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthServiceService, multi: true },
    UserDetailResolver,
    AuthguardGuard,
    UserService,
    AlertifyService,
    PreventUnsavedChanges,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },

    // {provide: HTTP_INTERCEPTORS,useClass:  ErrorInterceptor , multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
