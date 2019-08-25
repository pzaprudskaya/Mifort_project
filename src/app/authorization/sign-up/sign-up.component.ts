import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService, GoogleLoginProvider} from 'angular5-social-login';
import {User} from '../authorization.model';
import {ActivatedRoute} from '@angular/router';
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
  users: User[];
  state: boolean;

  ngOnInit() {
    this.state = false;
    this.signForm = new FormGroup({
      fullNameControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
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

  constructor(private socialAuthService: AuthService, private router: ActivatedRoute,
              private authorizationService: AuthorizationService) {
  }

  public socialSignUp(socialPlatform: string) {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        // this.user.id = userData.id;
        this.user.email = userData.email;
        this.user.name = userData.name;
        // this.user.image = userData.image;
        this.user.password = userData.email;
        this.users.find(
          element => element.email === this.user.email) ? this.state = true : this.state = false;
        if (this.state === true) {
          alert('This email is already registered');
        } else {
          /*this.authorizationService.sendUser(this.user).subscribe(
            () => console.log('send to server')
          );*/
          // this.router.navigate(['/sign-in']);
        }
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
    const user = {
      id: 0,
      email: this.signForm.value.emailControl,
      name: this.signForm.value.fullNameControl,
      password: this.signForm.value.passwordControl
    };
    this.users.find(
      element => element.email === this.user.email) ? this.state = true : this.state = false;
    if (this.state === true) {
      alert('This email is already registered');
    } else {
      const token = this.router.snapshot.queryParams['default-company'];
      if (this.signForm.status === 'VALID') {
        this.authorizationService.addNewUser(this.user, token)
          .subscribe(() => console.log('Add'));
        // this.router.navigate(['/sign-in']);
      } else {
        alert('Invalid data');

      }
    }
  }
}
