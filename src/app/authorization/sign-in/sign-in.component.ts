import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  signForm: FormGroup;
  type: string = "password"
  flag: boolean = false
  ngOnInit() {
    this.signForm = new FormGroup({
      "emailControl": new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
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
  showPassword(){
    if(this.type == "password") {
      this.type = "text"
      this.flag = true
    } else {
      this.type = "password"
      this.flag = false
    }
  }
}
