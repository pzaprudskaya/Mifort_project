import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-link-expired',
  templateUrl: './link-expired.component.html',
  styleUrls: ['./link-expired.component.sass']
})
export class LinkExpiredComponent implements OnInit {
  signForm: FormGroup;
  ngOnInit() {
    this.signForm = new FormGroup({
      "emailControl": new FormControl('', [Validators.required, Validators.minLength(5),
        Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
      ]),
    });
  } 
}
