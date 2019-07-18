import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SetNewPasswordComponent} from "./set-new-password/set-new-password.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {RestorePasswordComponent} from "./restore-password/restore-password.component";



const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'set-new-password', component: SetNewPasswordComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'restore-password', component: RestorePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
