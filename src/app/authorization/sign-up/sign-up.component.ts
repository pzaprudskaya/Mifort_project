import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService, GoogleLoginProvider} from 'angular5-social-login';
import {User} from '../authorization.model';
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
  users: User[];
  state: boolean;
  colors = ['#FF0000', '#FF9900', '#FFD600', '#00C537', '#109CF1', '#0047FF', '#9E00FF',
    '#000000', '#FF007A', '#AD5300', '#FFF500', '#2CD9FF', '#5438FF',
    '#DB00FF', '#8F8F8F', '#FF8A8A', '#FFCE84', '#FFF09F', '#99FCC1', '#9FDBFF',
    '#98B5FF', '#E0AEFF', '#E2E1E1'];

  constructor(private socialAuthService: AuthService, private activeRouter: ActivatedRoute, private router: Router,
              private authorizationService: AuthorizationService) {
  }

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


  socialSignUp() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        const user = {
          id: 0,
          name: userData.name,
          email: userData.email,
          photoUrl: userData.image,
          password: userData.id
        };
        this.users.forEach((item) => {
          if (item.email === userData.email) {
            alert('This email is already registered');
          } else {
            debugger;
            this.authorizationService.addNewUser(user)
              .subscribe(() => console.log('Add'));
            this.router.navigate(['/sign-in']);
          }
        });
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
    debugger;
    const i = Math.floor(Math.random() * this.colors.length);
    const user = {
      id: 0,
      email: this.signForm.value.emailControl,
      name: this.signForm.value.fullNameControl,
      photoUrl: this.colors[i],
      password: this.signForm.value.passwordControl
    };
    if (this.state === true) {
      alert('This email is already registered');
    } else {
      const token = this.activeRouter.snapshot.queryParams['default-company'];
      if (this.signForm.status === 'VALID') {
        if (token === undefined) {
          this.authorizationService.addNewUser(user)
            .subscribe(() => console.log('Add'));
        } else {
          this.authorizationService.addNewUserByDefaultToken(user, token)
            .subscribe(() => console.log('Add'));
        }
        this.router.navigate(['/sign-in']);
      } else {
        alert('Invalid data');
      }
    }
  }

}
