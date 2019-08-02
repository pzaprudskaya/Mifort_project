import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AuthorizationRoutingModule} from './authorization-routing.module';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SetNewPasswordComponent} from "./set-new-password/set-new-password.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {LinkExpiredComponent} from "./link-expired/link-expired.component";
import {RestorePasswordComponent} from "./restore-password/restore-password.component";
import {SocialLoginModule, AuthServiceConfig,} from "angular5-social-login";
import {getAuthServiceConfigs} from '../socialloginConfig';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule  } from "@angular/forms";
import {MaterialModule} from "../material.module";
import {MatInputModule} from '@angular/material';


@NgModule({
  declarations: [
    SignUpComponent,
    SetNewPasswordComponent,
    SignInComponent,
    RestorePasswordComponent,
    LinkExpiredComponent,

  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    RouterModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }

  ],
})
export class AuthorizationModule {
}











