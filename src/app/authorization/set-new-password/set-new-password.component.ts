import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.sass']
})
export class SetNewPasswordComponent implements OnInit {
  signForm: FormGroup;
  ngOnInit() {
    this.signForm = new FormGroup({
      "passwordControl": new FormControl('', [Validators.required, Validators.minLength(6)
      ]),
    });
  }
}
