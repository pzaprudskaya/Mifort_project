import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  signForm: FormGroup;
  ngOnInit() {
    this.signForm = new FormGroup({
      "fullNameControl": new FormControl('', [Validators.required, Validators.minLength(2)]),
      "passwordControl": new FormControl('', [Validators.required, Validators.minLength(6)
      ]),
    });
  }
  constructor( private socialAuthService: AuthService ) {}

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : " , userData);
      }
    );
  }
}
