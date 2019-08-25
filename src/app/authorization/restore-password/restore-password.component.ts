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
  constructor(private authorizationService: AuthorizationService) {}
  ngOnInit() {
    this.signForm = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
    });
    this.authorizationService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    );
  }
}
