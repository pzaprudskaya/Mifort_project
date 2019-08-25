import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import { User } from '../authorization.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  signForm: FormGroup;
  type = 'password';
  flag = false;
  user: User;
  authPrompt: boolean;
  ngOnInit() {
    this.signForm = new FormGroup({
      fullNameControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
      emailControl: new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6)
      ]),
    });
  }
  constructor( private socialAuthService: AuthService,  private router: ActivatedRoute, private authorizationService: AuthorizationService) {}

  public socialSignUn(socialPlatform: string) {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        // console.log(socialPlatform + " sign in data : " , userData);
        // this.user.id = userData.id;
        this.user.email = userData.email;
        this.user.name = userData.name;
        this.user.image = userData.image;
        this.user.password = userData.email;
      }
    );

  }
  showPassword() {
    if (this.type === 'password') {
      this.type = 'text';
      this.flag = true;
    } else {
      this.type = 'password';
      this.flag = false;
    }
  }
  checkRegistration() {
    this.user = {
      id: 0,
      email: this.signForm.value.emailControl,
      name: this.signForm.value.fullNameControl,
      image: 'https://www.deadline.com.ua/design/img/default-avatar.png',
      password: this.signForm.value.passwordControl
    };
    const token = this.router.snapshot.queryParams['default-company'];
    console.log(token);
    if (this.signForm.status === 'VALID') {
      this.authorizationService.addNewUser(this.user, token)
        .subscribe(() => console.log('Add'));
      // this.router.navigate(['/sign-in']);
    } else {
      this.authPrompt = true;
    }
  }
}
