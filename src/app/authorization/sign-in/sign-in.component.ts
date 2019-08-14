import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import { AuthorizationService } from '../authorization.service';
import { User } from '../authorization.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  signForm: FormGroup;
  type: string = "password";
  flag: boolean = false;
  users: User[];
  authPrompt: boolean;
  userData;
  ngOnInit() {
    this.authPrompt = false;
    this.signForm = new FormGroup({
      "emailControl": new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
      "passwordControl": new FormControl('', [Validators.required, Validators.minLength(6)
      ]),
    });
    this.authorizationService.getUsers().subscribe(
      users => {
        this.users = users; 
      }
    );
  }
  constructor( private socialAuthService: AuthService, private authorizationService: AuthorizationService, private router: Router ) {}

  public socialSignIn(socialPlatform : string){
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        console.log(socialPlatform + " sign in data : " , userData);
        userData = this.userData;
      }
    );
    // if(this.users.find(
    //   element => 
    //     element.email == this.userData.email && element.id == this.userData.id)){
    //   this.router.navigate(['/profile']);
    // }
    // else {
    //   console.log('yt pfhtufy!');
    // }
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
  authentification() {
    
    let formData = this.users.find(
      element => 
        element.email == this.signForm.value.emailControl && element.password == this.signForm.value.passwordControl && this.signForm.status === "VALID"
    );
    if(formData){
      this.router.navigate(['/profile']);
    }
    else {
      this.authPrompt = true;
    }
  }
}
