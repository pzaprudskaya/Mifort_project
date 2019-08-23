import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';
import { User } from '../authorization.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.sass']
})
export class RestorePasswordComponent implements OnInit {
  signForm: FormGroup;
  users: User[];
  userData;
  constructor(private authorizationService: AuthorizationService){}
  ngOnInit() {
    this.signForm = new FormGroup({
      "emailControl": new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
    });
    this.authorizationService.getUsers().subscribe(
      users => {
        this.users = users; 
      }
    );
  }
  restorePassword(){
    let user = {
      email: this.signForm.value.emailControl,
    }
    let formData = this.users.find(
      element => 
        element.email == this.signForm.value.emailControl && this.signForm.status === "VALID"
    );
    console.log(user.email);
    if(formData){
      this.authorizationService.sendEmail(user).subscribe(
        data => {
          let res: any = data; 
          console.log(
            `👏 > 👏 > 👏 > 👏  is successfully register and mail has been sent and the message id is `
          );
        },
        err => {
          console.log(err);
        }
      );
      alert('check your email');
    } 
    else {
      alert('Email does not exist');
    }
  }
}
