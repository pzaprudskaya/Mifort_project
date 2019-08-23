import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import { User } from '../authorization.model';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  signForm: FormGroup;
  type: string = "password";
  flag: boolean = false;
  user: User;
  users: User[];
  state: boolean;
  ngOnInit() {
    this.state = false;
    this.signForm = new FormGroup({
      "fullNameControl": new FormControl('', [Validators.required, Validators.minLength(2)]),
      "emailControl": new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
      "passwordControl": new FormControl('', [Validators.required, Validators.minLength(6)
      ]),
    });
    this.user = {
      id: '0',
      email: this.signForm.value.emailControl,
      name: this.signForm.value.fullNameControl,
      image: 'https://www.deadline.com.ua/design/img/default-avatar.png',
      password: this.signForm.value.passwordControl
    }
    this.authorizationService.getUsers().subscribe(
      users => {
        this.users = users; 
      }
    );
  }
  constructor( private socialAuthService: AuthService,  private router: Router, private authorizationService: AuthorizationService ) {}
  public socialSignUp(socialPlatform : string) {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        this.user.id = userData.id;
        this.user.email = userData.email;
        this.user.name = userData.name;
        this.user.image = userData.image;
        this.user.password = userData.email;
        this.users.find(
          element => element.email == this.user.email) ? this.state = true : this.state = false;
        if(this.state == true){
          alert('This email is already registered')
        } else { 
          this.authorizationService.sendUser(this.user).subscribe(
            () => console.log('send to server')
          );
          this.router.navigate(['/sign-in']);
        }
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
  checkRegistration(){
    this.user = {
      id: (+this.users.length).toString(),
      email: this.signForm.value.emailControl,
      name: this.signForm.value.fullNameControl,
      image: 'https://www.deadline.com.ua/design/img/default-avatar.png',
      password: this.signForm.value.passwordControl
    }
    this.users.find(
      element => element.email == this.user.email) ? this.state = true : this.state = false;
    if(this.state === true){
      alert('This email is already registered')
    } else { 
    if(this.signForm.status === "VALID"){
      this.authorizationService.sendUser(this.user).subscribe(
        () => console.log('send to server')
      );
      this.router.navigate(['/sign-in']);
    }
    else {
      alert('Invalid data');
    }
  }
  } 
}
// {
//   "id": "332",
//   "name": "Polina Zaprudskaya",
//   "email": "polinazaprudskaya@gmail.com",
//   "password": "refproxyproxy",
//   "image": "https://sun9-34.userapi.com/c824201/v824201969/173426/YW0DIgHPsvw.jpg?ava=1"
// },
// {
//   "id": "666",
//   "name": "Рил Мэйер",
//   "email": "rilm@gmail.com",
//   "password": "proxyproxy",
//   "image": "https://cs11.pikabu.ru/post_img/big/2019/07/19/7/1563534074173916847.png"
// },
// {
//   "id": "33666",
//   "name": "Moisei",
//   "email": "mois@mail.ru",
//   "password": "refggproxyproxy",
//   "image": "http://www.pravoslavie.ru/sas/image/102659/265940.p.jpg"
// },
// {
//   "id": "113700798833115792083",
//   "name": "Egor ",
//   "email": "drozdegor.sr@gmail.com",
//   "password": "refggproxyproxy",
//   "image": "http://www.pravoslavie.ru/sas/image/102659/265940.p.jpg"
// }