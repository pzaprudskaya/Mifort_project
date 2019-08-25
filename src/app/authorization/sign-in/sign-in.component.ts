import {Component, OnInit, AfterContentInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService, GoogleLoginProvider} from 'angular5-social-login';
import {AuthorizationService} from '../authorization.service';
import {User} from '../authorization.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit, AfterContentInit {
  signForm: FormGroup;
  type = 'password';
  flag = false;
  users: User[];
  userData;

  constructor(private socialAuthService: AuthService, private authorizationService: AuthorizationService, private router: Router) {
  }

  ngOnInit() {
    this.signForm = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6)
      ]),
    });
    this.authorizationService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    );
  }

  public socialSignIn(socialPlatform: string) {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        console.log(socialPlatform + ' sign in data : ', userData);
        this.userData = userData;
        this.users.find(
          element => element.email === this.userData.email) ? this.router.navigate(['/profile']) :
          alert('You are not registred, please register before enter');
      }
    );
  }

  ngAfterContentInit() {
    this.authorizationService.getUsers().subscribe(
      users => {
        console.log('subscribe WORK');
        this.users = users;
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

  authentification() {
    this.authorizationService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    );
    console.log('serv users:' + this.users);
    const formData = this.users.find(
      element =>
        element.email === this.signForm.value.emailControl && element.password === this.signForm.value.passwordControl
        && this.signForm.status === 'VALID'
    );

    formData ? this.router.navigate(['/profile']) : alert('Invalid email or password');
  }
}
